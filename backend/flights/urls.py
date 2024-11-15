from django.urls import path
from .views import FlightSearchView, TicketBookingView

urlpatterns = [
    path('search-flights/', FlightSearchView.as_view(), name='flight-search'),
    path('book-ticket/', TicketBookingView.as_view(), name='book-ticket'),
]   