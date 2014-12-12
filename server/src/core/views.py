from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from core.serializers import *
from datetime import datetime, date
from django.db.models import Q
import json
from dateutil import parser

class UserViewSet(viewsets.ModelViewSet):
  queryset = User.objects.all()
  serializer_class = UserSerializer

class ReservationViewSet(viewsets.ModelViewSet):
  queryset = Reservation.objects.all()
  serializer_class = ReservationSerializer

class RoomViewSet(viewsets.ModelViewSet):
  queryset = Room.objects.all()
  serializer_class = RoomSerializer

class BuildingViewSet(viewsets.ModelViewSet):
  queryset = Building.objects.all()
  serializer_class = BuildingSerializer

class AvailabilityView(APIView):

  def get(self, request, format=None):
    """ Return the availability for a specific day
        for all the rooms in a building
    """
    ondate = parser.parse(request.GET.get('date', str(date.today())))
    building = request.GET.get('building', None)

    roomqs = Room.objects
    if building is None:
      rooms = roomqs.all()
    else:
      rooms = roomqs.filter(floor_fk__building__pk=building)

    reservations = Reservation.objects\
      .order_by('-when_from')\
      .filter(
        (
          Q(when_from__year=ondate.year) & \
          Q(when_from__day=ondate.day) & \
          Q(when_from__month=ondate.month)
        ) | (
          Q(when_to__year=ondate.year) & \
          Q(when_to__day=ondate.day) & \
          Q(when_to__month=ondate.month)
        ),
        what__in=rooms
      )
    reservation_map = {}
    for res in reservations:
      reservation_map[res.what_id] = reservation_map.get(res.what_id, list()) + \
        [ReservationSerializer(res, context={'request': request}).data]

    return Response(reservation_map)
