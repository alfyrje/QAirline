from django.urls import path
from .views import PassengerView, UserRegisterView, UserLoginView
urlpatterns = [
    path('passengers/', PassengerView.as_view(), name='passenger-list'),
    path('register/', UserRegisterView.as_view(), name='user-register'),
    path('login/', UserLoginView.as_view(), name='user-login'),
]