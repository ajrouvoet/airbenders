from django.contrib.auth.models import User
from core.models import *
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):

  class Meta:
    model = User
    fields = ('url', 'username', 'first_name', 'last_name', 'email')

class RoomSerializer(serializers.ModelSerializer):

  class Meta:
    model = Room

class ReservationSerializer(serializers.ModelSerializer):
  who = UserSerializer()

  class Meta:
    model = Reservation
