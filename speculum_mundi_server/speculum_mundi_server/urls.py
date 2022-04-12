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

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/abstracts/<str:searchBy>=<str:searchText>/', views.AbstractView.as_view({'get': 'list'}), name='abstract'),
    path('api/discussions/<str:searchBy>=<str:searchText>/', views.DiscussionView.as_view({'get': 'list'}), name='discussion'),
    path('api/timeline_events/<str:searchBy>=<str:searchText>/', views.TimelineEventView.as_view({'get': 'list'}), name='timeline_event'),
    path('api/opinions/<str:searchBy>=<str:searchText>/', views.OpinionView.as_view({'get': 'list'}), name='opinion'),
    path('api/location_infos/<str:searchBy>=<str:searchText>/', views.LocationInfoView.as_view({'get': 'list'}), name='location_info'),
    path('api/cause_effects/<str:searchBy>=<str:searchText>/', views.CauseEffectView.as_view({'get': 'list'}), name='cause_effect'),
    path('api/location_shifts/<str:searchBy>=<str:searchText>/', views.LocationShiftView.as_view({'get': 'list'}), name='location_shift'),
]
