from django.db import models
from django.contrib.auth.models import User

class Resource(models.Model):

  name = models.CharField(max_length=256)

class Room(Resource):

  class Meta:
    unique_together = (('number',),)

  number = models.CharField(max_length=16)
  capacity = models.IntegerField()
  description = models.TextField(null=True, blank=True)
  floor_fk = models.ForeignKey('FloorLayout')

  def __str__(self):
    return self.name

class Reservation(models.Model):

  who   = models.ForeignKey(User)
  what  = models.ForeignKey(Resource)
  when_from   = models.DateTimeField()
  when_to     = models.DateTimeField()

class Building(models.Model):

  name = models.CharField(max_length=256)

  def __str__(self):
    return self.name

class Floor(models.Model):

  class Meta:
    ordering = ['floor']
    unique_together = (('floor', 'building'),)

  building = models.ForeignKey(Building)
  floor = models.IntegerField()

  def __str__(self):
    return self.building.name + ": " + str(self.floor)

class RoomLayout(models.Model):
  room = models.OneToOneField(Room, related_name="layout")
  layout = models.TextField()

  def __str__(self):
    return self.room.name + " layout"

class FloorLayout(models.Model):
  floor_fk    = models.OneToOneField(Floor, related_name="layout")
  layout      = models.TextField()

  def __str__(self):
    return "Floor " + str(self.floor_fk.floor) + " layout of " + self.floor_fk.building.name
