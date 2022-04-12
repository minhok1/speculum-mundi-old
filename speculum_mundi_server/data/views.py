from django.shortcuts import render
from rest_framework import viewsets
from .serializers import AbstractSerializer, DiscussionSerializer, TimelineEventSerializer, OpinionSerializer, LocationInfoSerializer, CauseEffectSerializer, LocationShiftSerializer
from .models import Abstract, Discussion, TimelineEvent, Opinion, LocationInfo, CauseEffect, LocationShift

# Create your views here.

class AbstractView(viewsets.ModelViewSet):
  serializer_class = AbstractSerializer

  def get_queryset(self):
    searchBy = self.kwargs['searchBy']
    searchText = self.kwargs['searchText']
    if searchBy == 'id': #exact search
      return Abstract.objects.filter(id = searchText)
    elif searchBy == 'title': #contain search
      return Abstract.objects.filter(title__icontains = searchText)
    # elif searchby == 'recent': #recent 'searchtext' number of abstracts
    #   return Abstract.objects.filter(timestamp__)
    elif searchBy == 'user':
      return Abstract.objects.filter(user = searchText)
    elif searchBy == 'type':
      return Abstract.objects.filter(type = searchText)
    

class DiscussionView(viewsets.ModelViewSet):
  serializer_class = DiscussionSerializer
  
  def get_queryset(self):
    searchBy = self.kwargs['searchBy']
    searchText = self.kwargs['searchText']
    if searchBy == 'id': #exact search
      return Discussion.objects.filter(id = searchText)
    elif searchBy == 'title': #contain search
      return Discussion.objects.filter(title__icontains = searchText)
    # elif searchby == 'recent': #recent 'searchtext' number of abstracts
    #   return Discussion.objects.filter(timestamp__)
    elif searchBy == 'user':
      return Discussion.objects.filter(user = searchText)
    elif searchBy == 'context': #search all discussion that belong to the same Abstract, Relation or TimelineEvent
      return Discussion.objects.filter(context__id = searchText)

class TimelineEventView(viewsets.ModelViewSet):#id abstract 
  serializer_class = TimelineEventSerializer
  
  def get_queryset(self):
    searchBy = self.kwargs['searchBy']
    searchText = self.kwargs['searchText']
    if searchBy == 'id': #exact search
      return TimelineEvent.objects.filter(id = searchText)
    elif searchBy == 'title': #contain search
      return TimelineEvent.objects.filter(title__icontains = searchText)
    # elif searchby == 'recent': #recent 'searchtext' number of abstracts
    #   return TimelineEvent.objects.filter(timestamp__)
    elif searchBy == 'user':
      return TimelineEvent.objects.filter(user = searchText)
    elif searchBy == 'context':
      return TimelineEvent.objects.filter(context_id = searchText)

class OpinionView(viewsets.ModelViewSet):
  serializer_class = OpinionSerializer

  def get_queryset(self):
    searchBy = self.kwargs['searchBy']
    searchText = self.kwargs['searchText']
    if searchBy == 'id': #exact search
      return Opinion.objects.filter(id = searchText)
    elif searchBy == 'title': #contain search
      return Opinion.objects.filter(title__icontains = searchText)
    # elif searchby == 'recent': #recent 'searchtext' number of abstracts
    #   return Opinion.objects.filter(timestamp__)
    elif searchBy == 'user':
      return Opinion.objects.filter(user = searchText)
    elif searchBy == 'upvotes':
      return Opinion.objects.filter(upvotes_gte = int(searchText))
    elif searchBy == 'thread':
      return Opinion.objects.filter(thread_id = searchText)

class LocationInfoView(viewsets.ModelViewSet):
  serializer_class = LocationInfoSerializer
  
  def get_queryset(self):
    searchBy = self.kwargs['searchBy']
    searchText = self.kwargs['searchText']
    # if searchBy == 'coordinates':
    #   return => use Q query to do x-coordinate AND y-coordinate
    if searchBy == 'timeline_event':
      return LocationInfo.objects.filter(timeline_event__id = searchText)

class CauseEffectView(viewsets.ModelViewSet):
  serializer_class = CauseEffectSerializer

  def get_queryset(self):
    searchBy = self.kwargs['searchBy']
    searchText = self.kwargs['searchText']
    if searchBy == 'id': #exact search
      return CauseEffect.objects.filter(id = searchText)
    elif searchBy == 'title': #contain search
      return CauseEffect.objects.filter(title__icontains = searchText)
    # elif searchby == 'recent': #recent 'searchtext' number of abstracts
    #   return CauseEffect.objects.filter(timestamp__)
    elif searchBy == 'user':
      return CauseEffect.objects.filter(user = searchText)
    elif searchBy == 'cause':
      return CauseEffect.objects.filter(cause__id = searchText)
    elif searchBy == 'effect':
      return CauseEffect.objects.filter(effect_id = searchText)

class LocationShiftView(viewsets.ModelViewSet):
  serializer_class = LocationShiftSerializer

  def get_queryset(self):
    searchBy = self.kwargs['searchBy']
    searchText = self.kwargs['searchText']
    if searchBy == 'id': #exact search
      return LocationShift.objects.filter(id = searchText)
    elif searchBy == 'title': #contain search
      return LocationShift.objects.filter(title__icontains = searchText)
    # elif searchby == 'recent': #recent 'searchtext' number of abstracts
    #   return LocationShift.objects.filter(timestamp__)
    elif searchBy == 'user':
      return LocationShift.objects.filter(user = searchText)
    elif searchBy == 'origin_timeline_event':
      return LocationShift.objects.filter(origin_timeline_event__id = searchText)
    elif searchBy == 'destination_timeline_event':
      return LocationShift.objects.filter(destination_timeline_event__id = searchText)