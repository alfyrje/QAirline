from rest_framework import viewsets, filters
from flights.models import Plane, Flight, Ticket
from flights.serializers import PlaneSerializer, FlightSerializer, TicketSerializer
from rest_framework.permissions import IsAdminUser
from rest_framework.pagination import PageNumberPagination

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

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

class TicketViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminUser]
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = '__all__'
    pagination_class = StandardResultsSetPagination