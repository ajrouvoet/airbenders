# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Reservation',
            fields=[
                ('id', models.AutoField(primary_key=True, auto_created=True, serialize=False, verbose_name='ID')),
                ('when_from', models.DateTimeField()),
                ('when_to', models.DateTimeField()),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Resource',
            fields=[
                ('id', models.AutoField(primary_key=True, auto_created=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=256)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Room',
            fields=[
                ('resource_ptr', models.OneToOneField(auto_created=True, parent_link=True, to='core.Resource', primary_key=True, serialize=False)),
                ('number', models.CharField(max_length=16)),
                ('capacity', models.IntegerField()),
                ('description', models.TextField(null=True, blank=True)),
            ],
            options={
            },
            bases=('core.resource',),
        ),
        migrations.AddField(
            model_name='reservation',
            name='what',
            field=models.ForeignKey(to='core.Resource'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='reservation',
            name='who',
            field=models.ForeignKey(to=settings.AUTH_USER_MODEL),
            preserve_default=True,
        ),
    ]
