from rest_framework import routers, serializers, viewsets
from django.conf.urls import url, include
from core.views import *

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'reservs', ReservationViewSet)

urls = [
  url(r'^', include(router.urls)),
  url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
