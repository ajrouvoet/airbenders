from django.contrib.auth.models import User
from core.models import *
from rest_framework import serializers
import json

class UserSerializer(serializers.ModelSerializer):

  class Meta:
    model = User
    fields = ('url', 'username', 'first_name', 'last_name', 'email')

class ResourceSerializer(serializers.ModelSerializer):

  class Meta:
    model = Resource

class ReservationSerializer(serializers.ModelSerializer):
  who = UserSerializer()

  class Meta:
    model = Reservation

class CoordinatesSerializer(serializers.BaseSerializer):

  def to_internal_value(self, data):
    try:
      js = json.loads(jsonstring)
      if type(js) != list:
        raise ValidationError("Not a json list!")
      if len(js) != 0 and type(js[0]) != list:
        raise ValidationError("Not a list of lists!")
      if len(filter(lambda x: len(x) != 2, js)) != 0:
        raise ValidationError("Not a list of tuples!")

      try:
        result = map(lambda x: map(lambda v: int(y),  x), js)
      except ValueError as e:
        raise ValidationError("Not a list of tuples of ints!")
    except ValueError as e:
      raise ValidationError("Not a valid json string")

    return result

  def to_representation(self, jsonstring):
      return json.loads(jsonstring)

  def create(self, validated_data):
      return json.dumps(validated_data)

class RoomLayoutSerializer(serializers.ModelSerializer):
  layout = CoordinatesSerializer()

  class Meta:
    model = RoomLayout
    fields = ("rooms",)

class RoomSerializer(serializers.ModelSerializer):
  reservations = ReservationSerializer(source='reservation_set', many=True)
  layout = CoordinatesSerializer(source="layout.layout")

  class Meta:
    model = Room

class FloorLayoutSerializer(serializers.ModelSerializer):
  rooms = RoomSerializer(source='floor_fk.room_set', many=True)

  class Meta:
    model = FloorLayout

class FloorSerializer(serializers.ModelSerializer):
  layout = FloorLayoutSerializer()

  class Meta:
    model = Floor

class BuildingSerializer(serializers.ModelSerializer):
  floors = FloorSerializer(source='floor_set', many=True)

  class Meta:
    model = Building
