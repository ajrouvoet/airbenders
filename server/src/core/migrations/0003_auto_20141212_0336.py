# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_layouts'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='floorlayout',
            name='floor',
        ),
        migrations.AddField(
            model_name='floorlayout',
            name='floor_fk',
            field=models.OneToOneField(default=0, to='core.Floor', related_name='layout'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='roomlayout',
            name='room',
            field=models.OneToOneField(to='core.Room', related_name='layout'),
        ),
    ]
