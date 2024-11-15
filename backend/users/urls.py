from django.urls import path
from .views import PassengerList

urlpatterns = [
    path('passengers/', PassengerList.as_view(), name='passenger-list'),
]