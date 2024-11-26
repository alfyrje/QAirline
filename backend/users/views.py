from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
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

class MyTokenObtainPairView(TokenObtainPairView):
    permission_classes = [AllowAny]
    serializer_class = serializers.MyTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        # try:
        #     serializer.is_valid(raise_exception=True)
        # except Exception as e:
        #     print("hello")
        #     return Response({"message": "helppppp me"})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        print(user)
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }, status=status.HTTP_200_OK)

class PassengerView(ListAPIView):
    queryset = models.Passenger.objects.all()
    serializer_class = serializers.PassengerSerializer

class UserRegisterView(APIView):
    queryset = models.User.objects.all()
    permission_classes = [AllowAny]  # Allow unauthenticated access
    def post(self, request):
        print("received request")
        serializer = serializers.UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return JsonResponse({
                'message': 'Register successful!',
            }, status=201)
        else:
            print(serializer.errors)
            return JsonResponse({
                'error_message': 'This email has already exist!',
                'errors_code': 400,
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
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer