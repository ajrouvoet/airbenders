# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Building',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=256)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Floor',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('floor', models.IntegerField()),
                ('building', models.ForeignKey(to='core.Building')),
            ],
            options={
                'ordering': ['floor'],
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='FloorLayout',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('layout', models.TextField()),
                ('floor', models.OneToOneField(to='core.Floor')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='RoomLayout',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('layout', models.TextField()),
                ('room', models.OneToOneField(to='core.Room')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AlterUniqueTogether(
            name='floor',
            unique_together=set([('floor', 'building')]),
        ),
        migrations.AddField(
            model_name='room',
            name='floor_fk',
            field=models.ForeignKey(to='core.FloorLayout', default=0),
            preserve_default=False,
        ),
        migrations.AlterUniqueTogether(
            name='room',
            unique_together=set([('number',)]),
        ),
    ]
