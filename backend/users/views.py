from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate

from .models import Passenger, User
from .serializers import PassengerSerializer, UserSerializer, UserLoginSerializer
from .utils import *

from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from django.http import JsonResponse
from rest_framework_simplejwt.tokens import RefreshToken

class PassengerView(ListAPIView):
    queryset = Passenger.objects.all()
    serializer_class = PassengerSerializer

class UserRegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return JsonResponse({
                'message': 'Register successful!',
                'refresh_token': str(refresh),
                'access_token': str(refresh.access_token),
            }, status=201)
        else:
            print(serializer.errors)
            return JsonResponse({
                'error_message': 'This email has already exist!',
                'errors_code': 400,
            }, status=400)

class UserLoginView(APIView):
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            print("OK")
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']

            # Authenticate user using email and password
            user = authenticate(request, username=email, password=password)
            print(user)
            if user is not None:
                # User authenticated, generate tokens
                refresh = TokenObtainPairSerializer.get_token(user)
                data = {
                    'refresh_token': str(refresh),
                    'access_token': str(refresh.access_token),
                }
                return Response(data, status=200)
            else:
                # Authentication failed
                return Response({
                    'error_message': 'Incorrect email or password!',
                    'error_code': 400,
                }, status=400)

        return Response({
            'error_message': serializer.errors,
            'error_code': 400,
        }, status=400)
    
class UserLogoutView(ListAPIView):
    def post(self, request):
        return Response({"message": "Logout successful"})
    
class UserView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer