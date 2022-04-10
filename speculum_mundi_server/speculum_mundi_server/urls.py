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
from data import views

router = routers.DefaultRouter()
router.register(r'abstracts', views.AbstractView, 'abstract')
router.register(r'discussions', views.DiscussionView, 'discussion')
router.register(r'timeline_events', views.TimelineEventView, 'timeline_event')
router.register(r'opinions', views.OpinionView, 'opinion')
router.register(r'location_infos', views.LocationInfoView, 'location_info')
router.register(r'cause_effects', views.CauseEffectView, 'cause_effect')
router.register(r'location_shifts', views.LocationShiftView, 'location_shift')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    # path('api/abstracts/<str:searchBy>=<str:searchText>/', views.AbstractView.as_view({'get': 'list'}), name='abstract'),
    # path('api/discussions/<str:searchBy>=<str:searchText>/', views.DiscussionView.as_view({'get': 'list'}), name='discussion'),
    # path('api/timelines/<str:searchBy>=<str:searchText>/', views.TimelineView.as_view({'get': 'list'}), name='timeline'),
    # path('api/opinions/<str:searchBy>=<str:searchText>/', views.OpinionView.as_view({'get': 'list'}), name='opinion'),
    # path('api/locations/<str:searchBy>=<str:searchText>/', views.LocationView.as_view({'get': 'list'}), name='location'),
]
