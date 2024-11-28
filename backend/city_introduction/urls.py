from django.urls import path
from .views import CityIntroductionView 

urlpatterns = [
       path('<str:city_name>/', CityIntroductionView.as_view(), name='city-introduction'),
]
