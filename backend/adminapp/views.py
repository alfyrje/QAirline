from rest_framework import viewsets, filters
from flights.models import Plane, Flight, Ticket
from users.models import User, Passenger
from flights.serializers import PlaneSerializer, FlightSerializer, TicketSerializer
from .serializers import PassengerSerializer, UserSerializer
from rest_framework.permissions import IsAdminUser
from rest_framework.pagination import PageNumberPagination
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from rest_framework.decorators import action
from rest_framework.response import Response
from travel_info.models import TravelInfo
from voucher.models import Voucher
from .serializers import TravelInfoSerializer, VoucherSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from .models import News
from django.core.mail import EmailMessage, send_mail
from django.conf import settings

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

def notify_user(user_id, message):
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        f"user_{user_id}",
        {
            "type": "send_notification",
            "message": message,
        }
    )

class PlaneViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminUser]
    queryset = Plane.objects.all()
    serializer_class = PlaneSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = '__all__'
    pagination_class = StandardResultsSetPagination

class FlightViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminUser]
    queryset = Flight.objects.all()
    serializer_class = FlightSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = [field for field in FlightSerializer.Meta.fields if field not in ['duration', 'economic_seats_left', 'business_seats_left']]
    pagination_class = StandardResultsSetPagination

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        flight = self.get_object()
        tickets = Ticket.objects.filter(flight=flight)
        for ticket in tickets:
            user_id = ticket.booker.id
            notify_user(user_id, {"message": f"Flight {flight.code} has been updated, affecting your ticket {ticket.id}"})
        return response
    
    @action(detail=True, methods=['post'])
    def process_update(self, request, pk=None):
        flight = self.get_object()
        original_data = FlightSerializer(flight).data

        serializer = FlightSerializer(flight, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            updated_data = serializer.data

            changes = []
            for field in original_data:
                if original_data[field] != updated_data[field]:
                    changes.append(f"{field} changed from {original_data[field]} to {updated_data[field]}")

            news_title = f"Flight {flight.code} Updated"
            news_content = f"The flight {flight.code} has been updated. Changes: " + ", ".join(changes)
            news_entry = News.objects.create(
                title=news_title,
                content=news_content,
            )
            news_entry.save()

            tickets = Ticket.objects.filter(flight=flight)
            for ticket in tickets:
                passenger_email = ticket.passenger.qr_email
                subject = f"QAirline: Thông báo thay đổi về chuyến bay {flight.code}"
                message = f"Thưa quý khách {ticket.passenger.first_name},\n\nChuyến bay {flight.code} đã có thay đổi như sau: " + "\n ".join(changes)
                send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [passenger_email])

            return Response({"message": "Flight update processed"})
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TicketViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminUser]
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = '__all__'
    pagination_class = StandardResultsSetPagination

class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminUser]
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = '__all__'
    pagination_class = StandardResultsSetPagination

class PassengerViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminUser]
    queryset = Passenger.objects.all()
    serializer_class = PassengerSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = '__all__'
    pagination_class = StandardResultsSetPagination

class TravelInfoViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminUser]
    queryset = TravelInfo.objects.all()
    serializer_class = TravelInfoSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = '__all__'
    pagination_class = StandardResultsSetPagination

class VoucherViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminUser]
    queryset = Voucher.objects.all()
    serializer_class = VoucherSerializer
    filter_backends = [filters.OrderingFilter]
    parser_classes = [MultiPartParser, FormParser]
    ordering_fields = '__all__'
    pagination_class = StandardResultsSetPagination

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import News
from .serializers import NewsSerializer
from rest_framework.permissions import AllowAny

class NewsListView(APIView):
    permission_classes = [AllowAny]
    def get(self, request, *args, **kwargs):
        news_entries = News.objects.all()
        serializer = NewsSerializer(news_entries, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
