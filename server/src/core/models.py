from django.db import models
from django.contrib.auth.models import User

class Resource(models.Model):

  name = models.CharField(max_length=256)

class Room(Resource):

  number = models.CharField(max_length=16)
  capacity = models.IntegerField()
  description = models.TextField(null=True, blank=True)

class Reservation(models.Model):

  who   = models.ForeignKey(User)
  what  = models.ForeignKey(Resource)
  when_from   = models.DateTimeField()
  when_to     = models.DateTimeField()
