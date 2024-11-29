from django.urls import path
from .views import FlightSearchView, CreateTicketsAPI

urlpatterns = [
    path('search-flights/', FlightSearchView.as_view(), name='flight-search'),
    path('create-tickets/', CreateTicketsAPI.as_view(), name='book-ticket'),
]   