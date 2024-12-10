from django.urls import path
from .views import FlightInfoView

urlpatterns = [
       path('<str:type_of_info>/', FlightInfoView.as_view(), name='flight-info'),
        path('', FlightInfoView.as_view(), name='flight-info-list'),
]
