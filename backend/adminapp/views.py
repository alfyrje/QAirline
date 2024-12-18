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
        print(f"Processing additional update logic for flight {flight.code}")
        print("Request user:", request.user)
        return Response({"message": "Flight update processed"})


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