from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.response import Response
from users import models
from users import serializers
from .models import User, Passenger
from django.contrib.auth import authenticate
from django.http import JsonResponse
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

import jwt
from django.conf import settings
import pyotp
import qrcode
import io
import base64
from datetime import timedelta
import secrets
import string


class MyTokenObtainPairView(TokenObtainPairView):
    queryset = User.objects.all()
    def post(self, request, *args, **kwargs):        
        serializer = serializers.UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            # Kiểm tra xem người dùng có tồn tại không
            user = User.objects.filter(username=request.data['username']).first()
            if not user:
                return Response(
                    {"detail": "Người dùng không tồn tại.", "status": 404}, status=404)

            # Xác thực mật khẩu
            if not user.check_password(request.data['password']):
                return Response({"detail": "Mật khẩu không đúng.", "status": 401}, status=401)
            pre_token = AccessToken()
            pre_token['user_id'] = user.id
            pre_token.set_exp(from_time=None, lifetime=timedelta(minutes=5))
            pre_token['is_2fa_enabled'] = user.is_2fa_enabled
            # Kiểm tra nếu user chưa setup 2FA
            if not user.is_2fa_enabled:
                return Response({
                    'requires_2fa_setup': True,
                    'user_id': user.id,
                    'pre_token': str(pre_token),
                    'status': 200,
                    'message': 'Cần thiết lập 2FA lần đầu tiên.'
                }, status=200)
            
            # Nếu đã có 2FA, yêu cầu verify
            return Response({
                'requires_2fa_verify': True,
                'user_id': user.id,
                'pre_token': str(pre_token),
                'status': 200,
                'message': 'Vui lòng nhập mã 2FA.'
            }, status=200)
        else: 
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class Setup2FAView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        user = request.user
        if user.is_2fa_enabled:
            return Response(
                {"detail": "2FA already enabled."},
                status=400
            )
        
        # Tạo secret mỗi lần setup
        user.otp_secret = pyotp.random_base32()
        user.save()
        
        # Tạo TOTP object
        totp = pyotp.TOTP(user.otp_secret)
        
        provisioning_uri = totp.provisioning_uri(
            name=user.email or user.username,
            issuer_name='QAirline'
        )
        
        # Tạo QR code
        qr = qrcode.QRCode(version=1, box_size=10, border=5)
        qr.add_data(provisioning_uri)
        qr.make(fit=True)
        
        img = qr.make_image(fill_color="black", back_color="white")
        buffer = io.BytesIO()
        img.save(buffer, format='PNG')
        buffer.seek(0)
        
        # Convert to base64
        qr_code_base64 = base64.b64encode(buffer.getvalue()).decode()
        
        return Response({
            'qr_code': f'data:image/png;base64,{qr_code_base64}',
            'secret': user.otp_secret,
            'user_id': user.id,
            'status': 200
        }, status=200)

class Enable2FAView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        user = request.user
        code = request.data.get('code')
        
        if not code:
            return Response({"detail": "code là bắt buộc."}, status=400)
        
        if not user.otp_secret:
            return Response({"detail": "Vui lòng setup 2FA trước."}, status=400)
        
        # Verify code
        totp = pyotp.TOTP(user.otp_secret)
        if not totp.verify(code, valid_window=1):
            return Response({"detail": "Mã 2FA không đúng."}, status=400)
        
        # Enable 2FA
        user.is_2fa_enabled = True
        
        # Generate Recovery Codes
        recovery_codes = [
            ''.join(secrets.choice(string.ascii_uppercase + string.digits) for _ in range(10))
            for _ in range(10)
        ]
        user.recovery_codes = recovery_codes
        user.save()
        
        # Trả về JWT tokens
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user_id': user.id,
            'recovery_codes': recovery_codes,
            'status': 200,
            'message': '2FA đã được kích hoạt thành công.'
        }, status=200)

class Verify2FAView(APIView):
    permission_classes = [IsAuthenticated] 
    
    def post(self, request):
        user = request.user
        code = request.data.get('code')
        
        if not code:
            return Response({"detail": "code là bắt buộc."}, status=400)
        
        if not user.is_2fa_enabled:
             return Response({"detail": "2FA chưa được kích hoạt."}, status=400)

        # Check if code is a recovery code
        if code in user.recovery_codes:

            user.recovery_codes.remove(code)
            user.save()
        else:
            # Verify TOTP
            if not user.otp_secret:
                return Response({"detail": "Lỗi cấu hình 2FA."}, status=400)
                
            totp = pyotp.TOTP(user.otp_secret)
            if not totp.verify(code, valid_window=1):
                return Response({"detail": "Mã 2FA không đúng.", "status": 401}, status=401)

        refresh = RefreshToken.for_user(user)
        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "user_id": user.id,
            "status": 200
        }, status=200)
        
class PassengerView(ListAPIView):
    queryset = models.Passenger.objects.all()
    serializer_class = serializers.PassengerSerializer

class UserRegisterView(APIView):
    queryset = models.User.objects.all()

    permission_classes = [AllowAny] 
    def post(self, request):
        serializer = serializers.UserSerializer(data=request.data)

        if serializer.is_valid():
            print("serializer is valid")
            if Passenger.objects.filter(citizen_id=request.data['personal_info'].get('citizen_id')).exists():
                print("passenger exists with citizen id")
                return Response({
                    'message': 'Số CMND đã tồn tại.',
                }, status=400)
            user = serializer.save()
            return Response({
                'message': 'Đăng ký tài khoản thành công.',
            }, status=200)
        else:
            username_errors = serializer.errors.get('username', [])
            for error in username_errors:
                print(error)
                if error == 'A user with that username already exists.':
                    return Response({
                        'message': 'Tài khoản email đã được đăng ký.',
                    }, status=400)

            # Trả về lỗi khác nếu không khớp điều kiện trên
            return Response({
                'message': 'Có lỗi xảy ra, vui lòng kiểm tra lại thông tin.',
                'details': serializer.errors
            }, status=400)
 
class UserView(ListAPIView):
    permission_classes = [AllowAny] 
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer

class ProfileView(ListAPIView):
    permission_classes = [AllowAny] 
    def get(self, request, *args, **kwargs):
        request_jwt = request.headers.get("Authorization").replace("Bearer ", "")
        request_jwt_decoded = jwt.decode(request_jwt, settings.SECRET_KEY, algorithms=['HS256'])
        user_id = request_jwt_decoded['user_id']
        user = models.User.objects.get(id=user_id)
        serializer = serializers.UserSerializer(user)
        print(serializer.data)
        return Response(serializer.data, status=200)

