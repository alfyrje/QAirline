from rest_framework.generics import ListAPIView
from .models import Flight, Ticket
from .serializers import FlightSerializer, TicketSerializer
from users.serializers import PassengerSerializer
from users.serializers import PassengerSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import ListCreateAPIView
from .serializers import TicketSerializer
from rest_framework.views import APIView
import logging
from django.contrib.auth.models import AnonymousUser
from rest_framework.permissions import AllowAny
import jwt
from django.conf import settings
import json


logger = logging.getLogger(__name__)

class BookedSeatsView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        flight_ids = request.data.get('flight_ids', [])
        if not flight_ids:
            return Response({"error": "Flight IDs are required"}, status=status.HTTP_400_BAD_REQUEST)

        booked_seats = {}
        for flight_id in flight_ids:
            tickets = Ticket.objects.filter(flight_id=flight_id)
            booked_seats[flight_id] = [ticket.seat for ticket in tickets]

        return Response(booked_seats, status=status.HTTP_200_OK)

class FlightSearchView(ListAPIView):
    permission_classes = [AllowAny]  # Allow unauthenticated access
    # authentication_classes = [TokenAuthentication]

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
        request_jwt = request.headers.get("Authorization").replace("Bearer ", "")
        request_jwt_decoded = jwt.decode(request_jwt, settings.SECRET_KEY, algorithms=['HS256'])
        user_id = request_jwt_decoded['user_id']
        flights = data.get('flights', [])
        passengers_data = data.get('passengers', [])
       
        if not flights or not passengers_data:
            return Response(
                {"error": "Missing required fields: flights or passengers"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        tickets = []
        # booker = request.user if not isinstance(request.user, AnonymousUser) else None
        booker_id = user_id
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
                
                seat = next((s['seat'] for s in passenger_data['seats'] if s['flight_id'] == flight_id), 'TEMP')

                ticket_data = {
                    'booker': booker_id,
                    'flight': flight.id,
                    'passenger': passenger.id,
                    'seat': seat,
                    'ticket_class': seat_class,
                }
        
                ticket_serializer = TicketSerializer(data=ticket_data)
                ticket_serializer.is_valid(raise_exception=True)
                tickets.append(ticket_serializer.save())

        return Response(
            {"message": "Passengers and tickets created successfully", "tickets": [TicketSerializer(t).data for t in tickets]},
            status=status.HTTP_201_CREATED
        )
    
class TicketsFlightsHistoryAPI(ListAPIView):
    permission_classes = [AllowAny]  # Allow unauthenticated access
    serializer_class = TicketSerializer
    def get(self, request, *args, **kwargs):
        request_jwt = request.headers.get("Authorization").replace("Bearer ", "")
        request_jwt_decoded = jwt.decode(request_jwt, settings.SECRET_KEY, algorithms=['HS256'])
        user_id = request_jwt_decoded['user_id']
        
        tickets = Ticket.objects.filter(booker_id=user_id)
        response_data = []

        for ticket in tickets:
            flight = ticket.flight
            passenger = ticket.passenger
            ticket_info = {
                "flight": {
                    "code": flight.code,
                    "plane_id": flight.plane.id,
                    "start_location": flight.start_location,
                    "end_location": flight.end_location,
                    "start_time": flight.start_time,
                    "end_time": flight.end_time,
                    "delay_status": flight.delay_status,
                },
                "passenger_info": {
                    "first_name": passenger.first_name,
                    "last_name": passenger.last_name,
                    "tel_num": passenger.tel_num,
                    "date_of_birth": passenger.date_of_birth,
                    "citizen_id": passenger.citizen_id,
                    "nationality": passenger.nationality,
                },
                "seat": ticket.seat,
                "ticket_class": ticket.get_ticket_class_display(),
                "ticket_id": ticket.id,
            }
            response_data.append(ticket_info)

        return Response(response_data, status=status.HTTP_200_OK)
    
    def delete(self, request, *args, **kwargs):
        body = json.loads(request.body)
        action = body.get("action")
        if action == 'cancel':
            ticket_id = request.data.get('ticketId')
            try:
                ticket = Ticket.objects.get(id=ticket_id)
            except Ticket.DoesNotExist:
                return Response(
                    {"error": f"Ticket with ID {ticket_id} not found"},
                    status=status.HTTP_404_NOT_FOUND
                )
            ticket.delete()
            return Response({"message": "Ticket canceled successfully"}, status=status.HTTP_200_OK)