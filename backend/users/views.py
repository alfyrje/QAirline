from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.response import Response
from rest_framework.response import Response

from users import models
from users import serializers
from .utils import *

from django.contrib.auth import authenticate
from django.http import JsonResponse
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

import jwt
from django.conf import settings

class PassengerView(ListAPIView):
    queryset = models.Passenger.objects.all()
    serializer_class = serializers.PassengerSerializer

class UserRegisterView(APIView):
    queryset = models.User.objects.all()
    permission_classes = [AllowAny] 
    def post(self, request):
        # print(request.data)
        serializer = serializers.UserSerializer(data=request.data)

        if serializer.is_valid():
            print("serializer is valid")
            user = serializer.save()
            return JsonResponse({
                'message': 'Register successful!',
            }, status=201)
        else:
            first_field = list(serializer.errors.keys())[0]
            error_message = serializer.errors[first_field][0]
            return JsonResponse({
                'error_message': error_message,
            }, status=400)

# class UserLoginView(APIView):
#     permission_classes = [AllowAny]  # Allow unauthenticated access
#     def post(self, request):
#         serializer = serializers.UserLoginSerializer(data=request.data)
#         if serializer.is_valid():
#             email = serializer.validated_data['email']
#             password = serializer.validated_data['password']

#             user = authenticate(request, username=email, password=password)
#             print(user)
#             if user is not None:
#                 # User authenticated, generate tokens
#                 refresh = RefreshToken.for_user(user)
#                 data = {
#                     'refresh_token': str(refresh),
#                     'access_token': str(refresh.access_token),
#                 }
#                 return Response(data, status=200)
#             else:
#                 # Authentication failed
#                 return Response({'error': 'Invalid credentials'}, status=401)

#         return Response({
#             'error_message': serializer.errors,
#             'error_code': 400,
#         }, status=400)
    
# class UserLogoutView(ListAPIView):
#     def post(self, request):
#         return Response({"message": "Logout successful"})
    
class UserView(ListAPIView):
    permission_classes = [AllowAny]  # Allow unauthenticated access
    permission_classes = [AllowAny]  # Allow unauthenticated access
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer

class ProfileView(ListAPIView):
    permission_classes = [AllowAny]  # Allow unauthenticated access
    def get(self, request, *args, **kwargs):
        request_jwt = request.headers.get("Authorization").replace("Bearer ", "")
        request_jwt_decoded = jwt.decode(request_jwt, settings.SECRET_KEY, algorithms=['HS256'])
        user_id = request_jwt_decoded['user_id']
        user = models.User.objects.get(id=user_id)
        serializer = serializers.UserSerializer(user)
        print(serializer.data)
        return Response(serializer.data, status=200)
    