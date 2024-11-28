from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings


urlpatterns = [
    path('admin/', admin.site.urls),
    path('/', include('users.urls')),
    path('flights/', include('flights.urls')),
    path('city_introduction/', include('city_introduction.urls'))
]
