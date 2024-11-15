from rest_framework.generics import ListAPIView
from .models import Flight, Ticket
from .serializers import FlightSerializer, TicketSerializer
from rest_framework.response import Response
from rest_framework import status

class FlightSearchView(ListAPIView):
    serializer_class = FlightSerializer

    def get_queryset(self):
        start_location = self.request.query_params.get('start_location')
        end_location = self.request.query_params.get('end_location')
        start_time = self.request.query_params.get('start_time')
        end_time = self.request.query_params.get('end_time')

        flights = Flight.objects.all()

        if start_location:
            flights = flights.filter(start_location__icontains=start_location)
        if end_location:
            flights = flights.filter(end_location__icontains=end_location)
        if start_time:
            flights = flights.filter(start_time__gte=start_time)
        if end_time:
            flights = flights.filter(end_time__lte=end_time)
        
        return flights

class TicketBookingView(ListAPIView):
    serializer_class = TicketSerializer

    def post(self, request, *args, **kwargs):
        flight_id = request.data.get('flight_id')
        booker_id = request.data.get('booker_id')
        seat = request.data.get('seat')
        ticket_class = request.data.get('ticket_class')

        ticket = Ticket.objects.create(flight_id=flight_id, booker_id=booker_id, seat=seat, ticket_class=ticket_class)

        return Response({'status': 'ticket booked successfully'}, status=status.HTTP_201_CREATED)