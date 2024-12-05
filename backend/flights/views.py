from rest_framework.generics import ListAPIView
from .models import Flight, Ticket
from .serializers import FlightSerializer, TicketSerializer
from users.serializers import PassengerSerializer
from rest_framework.response import Response
from rest_framework import status
from .serializers import TicketSerializer
from rest_framework.views import APIView
import logging
from rest_framework.permissions import AllowAny
import jwt
from django.conf import settings
import json
import qrcode
from io import BytesIO
from django.core.mail import send_mail
from django.core.files import File
from django.core.mail import EmailMessage



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
    serializer_class = FlightSerializer

    def get_queryset(self):
        start_location = self.request.query_params.get('start_location')
        end_location = self.request.query_params.get('end_location')
        start_time = self.request.query_params.get('start_time')
        passengers_no = self.request.query_params.get('passengers_no', '1')

        # Ensure passengers_no is a valid integer
        try:
            passengers_no = int(passengers_no)
        except ValueError:
            passengers_no = 1

        flights = Flight.objects.all()

        if start_location:
            flights = flights.filter(start_location__icontains=start_location)
        if end_location:
            flights = flights.filter(end_location__icontains=end_location)
        if start_time:
            start_time = datetime.datetime.strptime(start_time, '%Y-%m-%d')
            start_time = timezone.make_aware(start_time, timezone.get_current_timezone())
            flights = flights.filter(start_time__gte=start_time)
        else:
            flights = flights.filter(start_time__gte=timezone.now())
            print('STARTTIME', start_time)
            print('TIMEZONE', timezone.now())
        # Annotate the number of booked seats for each class
        flights = flights.annotate(
            economy_seats=Count('ticket', filter=Q(ticket__ticket_class='E')),
            business_seats=Count('ticket', filter=Q(ticket__ticket_class='B'))
        ).filter(
            Q(plane__economic_seats__gte=F('economy_seats') + passengers_no) &
            Q(plane__business_seats__gte=F('business_seats') + passengers_no)
        )

        return flights

class CreateTicketsAPI(ListAPIView):
    permission_classes = [AllowAny]  # Allow unauthenticated access
    def post(self, request, *args, **kwargs):
        data = request.data
        flights = data.get('flights', [])
        passengers_data = data.get('passengers', [])
        request_token = data.get('token')
        if not flights or not passengers_data:
            return Response(
                {"error": "Missing required fields: flights or passengers"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if request_token is None:
            booker_id = None
        else: 
            request_jwt = request_token
            request_jwt_decoded = jwt.decode(request_jwt, settings.SECRET_KEY, algorithms=['HS256'])
            user_id = request_jwt_decoded['user_id']
            booker_id = user_id
        
        tickets = []
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
                    'cancelled': False,
                }
        
                ticket_serializer = TicketSerializer(data=ticket_data)
                ticket_serializer.is_valid(raise_exception=True)
                ticket = ticket_serializer.save()
                tickets.append(ticket)

                qr_data = f"Ticket ID: {ticket.id}, Flight ID: {flight_id}, Seat: {seat}, Passenger: {passenger.id}"
                qr = qrcode.make(qr_data)

                qr_image = BytesIO()
                qr.save(qr_image, format='PNG')
                qr_image.seek(0)

                # Create a Django file-like object from the BytesIO object
                qr_file = File(qr_image, name=f"ticket_{ticket.id}_qr.png")

                # Send the email with the QR code attached
                subject = "Your Ticket QR Code"
                message = "Please find your QR code for the flight ticket attached."
                # email = EmailMessage(subject, message, settings.DEFAULT_FROM_EMAIL, [passenger.qr_email])
                # email.attach('ticket_qr.png', qr_file.read(), 'image/png')
                # email.send()

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
                    "qr_mail": passenger.qr_email,
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
            ticket.cancelled = True
            ticket.save()
            return Response({"message": "Ticket canceled successfully"}, status=status.HTTP_200_OK)
        
class FlightLocationsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        start_locations = Flight.objects.values_list('start_location', flat=True).distinct()
        end_locations = Flight.objects.values_list('end_location', flat=True).distinct()
        
        unique_locations = set(start_locations).union(set(end_locations))
        
        locations = {
            "locations": list(unique_locations)
        }
        
        return Response(locations, status=status.HTTP_200_OK)