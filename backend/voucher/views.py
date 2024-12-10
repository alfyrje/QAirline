from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Voucher
from .serializers import VoucherSerializer
from rest_framework.permissions import  AllowAny

class VoucherView(APIView):
    permission_classes = [AllowAny]
    def get(self, request, voucher_code):
        try:
            voucher = Voucher.objects.get(voucher_code=voucher_code)
            serializer = VoucherSerializer(voucher)
            return Response(serializer.data, status=status.HTTP_200_OK)
            
        except Voucher.DoesNotExist:
            return Response({"detail": "Voucher not found."}, status=status.HTTP_404_NOT_FOUND)
