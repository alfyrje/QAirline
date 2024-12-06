from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PlaneViewSet, FlightViewSet, TicketViewSet

router = DefaultRouter()
router.register(r'planes', PlaneViewSet)
router.register(r'flights', FlightViewSet)
router.register(r'tickets', TicketViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]