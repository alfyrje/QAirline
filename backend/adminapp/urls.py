from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PlaneViewSet, FlightViewSet, TicketViewSet, UserViewSet, PassengerViewSet, TravelInfoViewSet, VoucherViewSet
from .views import NewsListView, UserNotificationsView
router = DefaultRouter()
router.register(r'planes', PlaneViewSet)
router.register(r'flights', FlightViewSet)
router.register(r'tickets', TicketViewSet)
router.register(r'users', UserViewSet)
router.register(r'passengers', PassengerViewSet)
router.register(r'travelinfo', TravelInfoViewSet)
router.register(r'vouchers', VoucherViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/news/', NewsListView.as_view(), name='news-list'),
    path('notifications/', UserNotificationsView.as_view(), name='user-notifications'),
]