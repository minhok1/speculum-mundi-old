from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.generics import ListAPIView, CreateAPIView

from .serializers import AbstractSerializer, DiscussionSerializer, TimelineEventSerializer, OpinionSerializer, LocationInfoSerializer, CauseEffectSerializer, LocationShiftSerializer
from .models import Abstract, Discussion, TimelineEvent, Opinion, LocationInfo, CauseEffect, LocationShift

# Create your views here.

class AbstractView(ListAPIView):
  serializer_class = AbstractSerializer

  def get_queryset(self):
    searchBy = self.kwargs['searchBy']
    searchText = self.kwargs['searchText']
    if searchBy == 'id': #exact search
      return Abstract.objects.filter(id = searchText)
    elif searchBy == 'title': #contain search
      return Abstract.objects.filter(title__icontains = searchText)
    elif searchBy == 'user':
      return Abstract.objects.filter(user = searchText)
    elif searchBy == 'type':
      return Abstract.objects.filter(type = searchText)

class CreateAbstractView(CreateAPIView):
  serializer_class = AbstractSerializer
  queryset = Abstract.objects.all()

class DiscussionView(ListAPIView):
  serializer_class = DiscussionSerializer
  
  def get_queryset(self):
    searchBy = self.kwargs['searchBy']
    searchText = self.kwargs['searchText']
    if searchBy == 'id': #exact search
      return Discussion.objects.filter(id = searchText)
    elif searchBy == 'title': #contain search
      return Discussion.objects.filter(title__icontains = searchText)
    elif searchBy == 'user':
      return Discussion.objects.filter(user = searchText)
    elif searchBy == 'abstract_context':
      return Discussion.objects.filter(abstract_context__id = searchText)
    elif searchBy == 'timeline_event_context':
      return Discussion.objects.filter(timeline_event_context__id = searchText)
    elif searchBy == 'cause_effect_context':
      return Discussion.objects.filter(cause_effect_context__id = searchText)
    elif searchBy == 'location_shift_context':
      return Discussion.objects.filter(location_shift_context__id = searchText)

class CreateDiscussionView(CreateAPIView):
  serializer_class = DiscussionSerializer
  queryset = Discussion.objects.all()

class TimelineEventView(ListAPIView):#id abstract 
  serializer_class = TimelineEventSerializer
  
  def get_queryset(self):
    searchBy = self.kwargs['searchBy']
    searchText = self.kwargs['searchText']
    if searchBy == 'id': #exact search
      return TimelineEvent.objects.filter(id = searchText)
    elif searchBy == 'title': #contain search
      return TimelineEvent.objects.filter(title__icontains = searchText)
    elif searchBy == 'user':
      return TimelineEvent.objects.filter(user = searchText)
    elif searchBy == 'context':
      return TimelineEvent.objects.filter(context__id = searchText).order_by('event_year','event_month','event_date')

class CreateTimelineEventView(CreateAPIView):
  serializer_class = TimelineEventSerializer
  queryset = TimelineEvent.objects.all()

class OpinionView(ListAPIView):
  serializer_class = OpinionSerializer

  def get_queryset(self):
    searchBy = self.kwargs['searchBy']
    searchText = self.kwargs['searchText']
    if searchBy == 'id': #exact search
      return Opinion.objects.filter(id = searchText)
    elif searchBy == 'title': #contain search
      return Opinion.objects.filter(title__icontains = searchText)
    elif searchBy == 'user':
      return Opinion.objects.filter(user = searchText)
    elif searchBy == 'upvotes':
      return Opinion.objects.filter(upvotes__gte = int(searchText))
    elif searchBy == 'thread':
      return Opinion.objects.filter(thread__id = searchText)

class CreateOpinionView(CreateAPIView):
  serializer_class = OpinionSerializer
  queryset = Opinion.objects.all()

class LocationInfoView(ListAPIView):
  serializer_class = LocationInfoSerializer
  
  def get_queryset(self):
    searchBy = self.kwargs['searchBy']
    searchText = self.kwargs['searchText']
    # if searchBy == 'coordinates':
    #   return => use Q query to do x-coordinate AND y-coordinate

class CreateLocationInfoView(CreateAPIView):
  serializer_class = LocationInfoSerializer
  queryset = LocationInfo.objects.all()

class CauseEffectView(ListAPIView):
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
      return CauseEffect.objects.filter(effect__id = searchText)
    elif searchBy == 'cause_to_effect':
      [causeId, effectId] = searchText.split("to")
      return CauseEffect.objects.filter(cause__id = causeId).filter(effect__id = effectId)

class CreateCauseEffectView(CreateAPIView):
  serializer_class = CauseEffectSerializer
  queryset = CauseEffect.objects.all()

class LocationShiftView(ListAPIView):
  serializer_class = LocationShiftSerializer

  def get_queryset(self):
    searchBy = self.kwargs['searchBy']
    searchText = self.kwargs['searchText']
    if searchBy == 'id': #exact search
      return LocationShift.objects.filter(id = searchText)
    elif searchBy == 'title': #contain search
      return LocationShift.objects.filter(title__icontains = searchText)
    elif searchBy == 'user':
      return LocationShift.objects.filter(user = searchText)
    elif searchBy == 'origin_timeline_event':
      return LocationShift.objects.filter(origin_timeline_event__id = searchText)
    elif searchBy == 'destination_timeline_event':
      return LocationShift.objects.filter(destination_timeline_event__id = searchText)
    elif searchBy == 'origin_to_destination':
      [originId, destinationId] = searchText.split("to")
      return LocationShift.objects.filter(origin_timeline_event__id = originId).filter(destination_timeline_event__id = destinationId)

class CreateLocationShiftView(CreateAPIView):
  serializer_class = LocationShiftSerializer
  queryset = LocationShift.objects.all()