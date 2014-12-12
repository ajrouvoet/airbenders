from rest_framework import routers, serializers, viewsets
from django.conf.urls import url, include
from core.views import *

class AngularRouter(routers.DefaultRouter):
  routes = [
    routers.Route(
      url=r'^{prefix}/{lookup}{trailing_slash}$',
      mapping={
        'post': 'update',
        'get': 'retrieve',
        'put': 'update',
        'patch': 'partial_update',
        'delete': 'destroy'
      },
      name='{basename}-ng-update',
      initkwargs={'suffix': 'Instance'}
    )
  ] + routers.DefaultRouter.routes

router = AngularRouter(trailing_slash=False)
router.register(r'users', UserViewSet)
router.register(r'reservs', ReservationViewSet)
router.register(r'rooms', RoomViewSet)

urls = [
  url(r'^', include(router.urls)),
  url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
