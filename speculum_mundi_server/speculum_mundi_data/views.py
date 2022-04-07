from django.shortcuts import render
from rest_framework import viewsets
from .serializers import AbstractSerializer, DiscussionSerializer, TimelineSerializer, OpinionSerializer, LocationSerializer, TimelineToTimelineSerializer, TimelineToAbstractSerializer, AbstractToTimelineSerializer
from .models import Abstract, Discussion, Timeline, Opinion, Location, TimelineToTimeline, TimelineToAbstract, AbstractToTimeline

# Create your views here.

class AbstractView(viewsets.ModelViewSet):
  serializer_class = AbstractSerializer
  queryset = Abstract.objects.all()

class DiscussionView(viewsets.ModelViewSet):
  serializer_class = DiscussionSerializer
  queryset = Discussion.objects.all()

class TimelineView(viewsets.ModelViewSet):
  serializer_class = DiscussionSerializer
  queryset = Timeline.objects.all()

class OpinionView(viewsets.ModelViewSet):
  serializer_class = DiscussionSerializer
  queryset = Opinion.objects.all()

class LocationView(viewsets.ModelViewSet):
  serializer_class = DiscussionSerializer
  queryset = Location.objects.all()

class TimelineToTimelineView(viewsets.ModelViewSet):
  serializer_class = DiscussionSerializer
  queryset = TimelineToTimeline.objects.all()

class TimelineToAbstractView(viewsets.ModelViewSet):
  serializer_class = DiscussionSerializer
  queryset = TimelineToAbstract.objects.all()

class AbstractToTimelineView(viewsets.ModelViewSet):
  serializer_class = DiscussionSerializer
  queryset = AbstractToTimeline.objects.all()