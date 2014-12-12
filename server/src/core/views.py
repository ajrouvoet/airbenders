from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import viewsets
from core.serializers import *

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
