from django.urls import path
from .views import VoucherView

urlpatterns = [
       path('', VoucherView.as_view(), name='voucher_code'),
]
