from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/', include('users.urls')),
    path('flights/', include('flights.urls')),
    path('city_introduction/', include('city_introduction.urls')),
    path('voucher/', include('voucher.urls')),
    path('travel_info/', include('travel_info.urls')),
    # path('dynapi/', include('django_dyn_api.urls')),
    path('adminapp/', include('adminapp.urls')),
]
