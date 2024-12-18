from django.urls import path
from .views import FlightSearchView, CreateTicketsAPI, \
TicketsFlightsHistoryAPI, BookedSeatsView, FlightLocationsView, \
TicketSearchView, InitiateCancelTicketAPI, ConfirmCancelTicketAPI

urlpatterns = [
    path('initiate-cancel/<int:ticket_id>/', InitiateCancelTicketAPI.as_view(), name='initiate-cancel-ticket'),
    path('confirm-cancel/', ConfirmCancelTicketAPI.as_view(), name='confirm-cancel-ticket'),    
    path('search-flights/', FlightSearchView.as_view(), name='flight-search'),
    path('create-tickets/', CreateTicketsAPI.as_view(), name='book-ticket'),
    path('tickets-history/', TicketsFlightsHistoryAPI.as_view(), name='tickets-history'),
    path('booked-seats/', BookedSeatsView.as_view(), name='booked-seats'),
    path('locations/', FlightLocationsView.as_view(), name='locations'),
    path('search-tickets/', TicketSearchView.as_view(), name='ticket-info'),
]   