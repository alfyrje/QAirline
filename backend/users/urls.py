from django.urls import path
from .views import PassengerView, UserRegisterView, UserLoginView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('passengers/', PassengerView.as_view(), name='passenger-list'),
    path('register/', UserRegisterView.as_view(), name='user-register'),
    path('login/', UserLoginView.as_view(), name='user-login'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh')
]