from django.urls import path
from users import views
from rest_framework_simplejwt.views import (
    TokenRefreshView, TokenObtainPairView
)

urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('admtoken/', views.TokenObtainPairView.as_view(), name='adm_token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('users/', views.UserView.as_view(), name='users-list'),
    path('passengers/', views.PassengerView.as_view(), name='passenger-list'),
    path('register/', views.UserRegisterView.as_view(), name='user-register'),
    path('profile/', views.ProfileView.as_view(), name='profile'),
]