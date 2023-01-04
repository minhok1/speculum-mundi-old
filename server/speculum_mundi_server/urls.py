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
from django.conf.urls.static import static
from django.conf import settings

from data import views
from users.views import UserViewSet
from auth.views import LoginViewSet, RegistrationViewSet, RefreshViewSet


router = routers.DefaultRouter()

routes = routers.SimpleRouter()

# AUTHENTICATION
routes.register(r'auth/login', LoginViewSet, basename='auth-login')
routes.register(r'auth/register', RegistrationViewSet, basename='auth-register')
routes.register(r'auth/refresh', RefreshViewSet, basename='auth-refresh')

# USER
routes.register(r'user', UserViewSet, basename='user')

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('api/', include(router.urls)),
    path('api/', include(routes.urls)),
    path('api/abstracts/<str:searchBy>=<str:searchText>/', views.AbstractView.as_view()),
    path('api/abstracts/create/', views.CreateAbstractView.as_view()),
    path('api/discussions/<str:searchBy>=<str:searchText>/', views.DiscussionView.as_view()),
    path('api/discussions/create/', views.CreateDiscussionView.as_view()),
    path('api/timeline_events/<str:searchBy>=<str:searchText>/<str:filter>=<str:filterText>', views.TimelineEventView.as_view()),
    path('api/timeline_events/create/', views.CreateTimelineEventView.as_view()),
    path('api/opinions/<str:searchBy>=<str:searchText>/', views.OpinionView.as_view()),
    path('api/opinions/create/', views.CreateOpinionView.as_view()),
    path('api/location_infos/<str:searchBy>=<str:searchText>/', views.LocationInfoView.as_view()),
    path('api/location_infos/create/', views.CreateLocationInfoView.as_view()),
    path('api/cause_effects/<str:searchBy>=<str:searchText>/', views.CauseEffectView.as_view()),
    path('api/cause_effects/create/', views.CreateCauseEffectView.as_view()),
    path('api/location_shifts/<str:searchBy>=<str:searchText>/', views.LocationShiftView.as_view()),
    path('api/location_shifts/create/', views.CreateLocationShiftView.as_view()),
    path('api/user_save/user=<str:userEmail>/', views.UserSaveView.as_view()),
    path('api/user_save/create/', views.CreateUserSaveView.as_view()),
    path('api/user_save/update/', views.UpdateUserSaveView.as_view()),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
