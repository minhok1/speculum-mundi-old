"""speculum_mundi_server URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from speculum_mundi_data import views

router = routers.DefaultRouter()
router.register(r'abstracts', views.AbstractView, 'abstract')
router.register(r'discussions', views.DiscussionView, 'discussion')
router.register(r'timelines', views.TimelineView, 'timeline')
router.register(r'opinions', views.OpinionView, 'opinion')
router.register(r'locations', views.LocationView, 'location')
router.register(r'timeline_to_timelines', views.TimelineToTimelineView, 'timeline_to_timeline')
router.register(r'timeline_to_abstracts', views.TimelineToAbstractView, 'timeline_to_abstract')
router.register(r'abstract_to_timelines', views.AbstractToTimelineView, 'abstract_to_timeline')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
