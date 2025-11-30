from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from two_factor.urls import urlpatterns as tf_urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/', include('users.urls')),
    path('flights/', include('flights.urls')),
    path('city_introduction/', include('city_introduction.urls')),
    path('voucher/', include('voucher.urls')),
    path('travel_info/', include('travel_info.urls')),
    # path('dynapi/', include('django_dyn_api.urls')),
    path('adminapp/', include('adminapp.urls')),
    path('', include(tf_urls)),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)