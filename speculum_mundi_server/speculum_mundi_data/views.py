from django.shortcuts import render
from rest_framework import viewsets
from .serializers import AbstractSerializer, DiscussionSerializer, TimelineSerializer, OpinionSerializer, LocationSerializer, TimelineToTimelineSerializer, TimelineToAbstractSerializer, AbstractToTimelineSerializer
from .models import Abstract, Discussion, Timeline, Opinion, Location, TimelineToTimeline, TimelineToAbstract, AbstractToTimeline

# Create your views here.

class AbstractView(viewsets.ModelViewSet):
  serializer_class = AbstractSerializer

  def get_queryset(self):
    searchBy = self.kwargs['searchBy']
    searchText = self.kwargs['searchText']
    if searchBy == 'title':
      return Abstract.objects.filter(title__icontains = searchText)
    elif searchBy == 'type':
      return Abstract.objects.filter(type__icontains = searchText)

class DiscussionView(viewsets.ModelViewSet):
  serializer_class = DiscussionSerializer
  
  def get_queryset(self):
    searchBy = self.kwargs['searchBy']
    searchText = self.kwargs['searchText']
    if searchBy == 'id':
      return Discussion.objects.filter(id__icontains = searchText)
    elif searchBy == 'user':
      return Discussion.objects.filter(user__icontains = searchText)
    # elif searchBy == 'timestamp':
    #   start_date = datetime.date(2005, 1, 1)
    #   end_date = datetime.date(2005, 3, 31)
    #   Entry.objects.filter(pub_date__range=(start_date, end_date)) ==> use something like this

class TimelineView(viewsets.ModelViewSet):#id abstract 
  serializer_class = TimelineSerializer
  def get_queryset(self):
    searchBy = self.kwargs['searchBy']
    searchText = self.kwargs['searchText']
    if searchBy == 'id':
      return Timeline.objects.filter(id__icontains = searchText)
    elif searchBy == 'abstract':
      return Timeline.objects.filter(abstract__title__icontains = searchText)

class OpinionView(viewsets.ModelViewSet):
  serializer_class = OpinionSerializer
  queryset = Opinion.objects.all()

class LocationView(viewsets.ModelViewSet):
  serializer_class = LocationSerializer
  queryset = Location.objects.all()

class TimelineToTimelineView(viewsets.ModelViewSet):
  serializer_class = TimelineToTimelineSerializer
  queryset = TimelineToTimeline.objects.all()

class TimelineToAbstractView(viewsets.ModelViewSet):
  serializer_class = TimelineToAbstractSerializer
  queryset = TimelineToAbstract.objects.all()

class AbstractToTimelineView(viewsets.ModelViewSet):
  serializer_class = AbstractToTimelineSerializer
  queryset = AbstractToTimeline.objects.all()