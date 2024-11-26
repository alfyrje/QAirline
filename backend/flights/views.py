from rest_framework.generics import ListAPIView
from .models import Flight, Ticket
from .serializers import FlightSerializer, TicketSerializer
from users.serializers import PassengerSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import ListCreateAPIView
from .serializers import TicketSerializer
from rest_framework.views import APIView
import logging
from django.contrib.auth.models import AnonymousUser
from rest_framework.permissions import AllowAny

logger = logging.getLogger(__name__)

class FlightSearchView(ListAPIView):
    permission_classes = [AllowAny]  # Allow unauthenticated access
    # authentication_classes = [TokenAuthentication]

    serializer_class = FlightSerializer

    def get_queryset(self):
        start_location = self.request.query_params.get('start_location')
        end_location = self.request.query_params.get('end_location')
        start_time = self.request.query_params.get('start_time')

        flights = Flight.objects.all()

        if start_location:
            flights = flights.filter(start_location__icontains=start_location)
        if end_location:
            flights = flights.filter(end_location__icontains=end_location)
        if start_time:
            flights = flights.filter(start_time__gte=start_time)
        
        return flights

class CreateTicketsAPI(ListAPIView):
    permission_classes = [AllowAny]  # Allow unauthenticated access
    def post(self, request, *args, **kwargs):
        data = request.data

        flights = data.get('flights', [])
        passengers_data = data.get('passengers', [])
       
        if not flights or not passengers_data:
            return Response(
                {"error": "Missing required fields: flights or passengers"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        tickets = []
        booker = request.user if not isinstance(request.user, AnonymousUser) else None

        for flight_info in flights:
            flight_id = flight_info.get('flightId')
            seat_class = flight_info.get('seatClass')

            try:
                flight = Flight.objects.get(id=flight_id)
            except Flight.DoesNotExist:
                return Response(
                    {"error": f"Flight with ID {flight_id} not found"},
                    status=status.HTTP_404_NOT_FOUND
                )
            for passenger_data in passengers_data:
                passenger_serializer = PassengerSerializer(data=passenger_data)
                passenger_serializer.is_valid(raise_exception=True)
                passenger = passenger_serializer.save()

                ticket_data = {
                    'booker': booker.id if booker else None,
                    'flight': flight.id,
                    'passenger': passenger.id,
                    'seat': 'TEMP',
                    'ticket_class': seat_class,
                }
        
                ticket_serializer = TicketSerializer(data=ticket_data)
                ticket_serializer.is_valid(raise_exception=True)
                tickets.append(ticket_serializer.save())

        return Response(
            {"message": "Passengers and tickets created successfully", "tickets": [TicketSerializer(t).data for t in tickets]},
            status=status.HTTP_201_CREATED
        )