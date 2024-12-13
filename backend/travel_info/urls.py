from django.urls import path
from .views import TravelInfoView

urlpatterns = [
       path('<str:title>/', TravelInfoView.as_view(), name='travel_info'),
]
