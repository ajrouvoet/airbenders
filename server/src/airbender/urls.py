from django.conf.urls import patterns, include, url
from django.contrib import admin
from core import api

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'airbender.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/1.0/', include(api.urls)),
)
