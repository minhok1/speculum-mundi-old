from django.shortcuts import render
from rest_framework import viewsets
from .serializers import AbstractSerializer, DiscussionSerializer, TimelineEventSerializer, OpinionSerializer, LocationInfoSerializer, CauseEffectSerializer, LocationShiftSerializer
from .models import Abstract, Discussion, TimelineEvent, Opinion, LocationInfo, CauseEffect, LocationShift

# Create your views here.

class AbstractView(viewsets.ModelViewSet):
  serializer_class = AbstractSerializer
  queryset = Abstract.objects.all()

  # def get_queryset(self):
  #   searchBy = self.kwargs['searchBy']
  #   searchText = self.kwargs['searchText']
  #   if searchBy == 'title':
  #     return Abstract.objects.filter(title__icontains = searchText)
  #   elif searchBy == 'type':
  #     return Abstract.objects.filter(type__icontains = searchText)

class DiscussionView(viewsets.ModelViewSet):
  serializer_class = DiscussionSerializer
  queryset = Discussion.objects.all()
  
  # def get_queryset(self):
  #   searchBy = self.kwargs['searchBy']
  #   searchText = self.kwargs['searchText']
  #   if searchBy == 'id':
  #     return Discussion.objects.filter(id__icontains = searchText)
  #   elif searchBy == 'user':
  #     return Discussion.objects.filter(user__icontains = searchText)
    # elif searchBy == 'timestamp':
    #   start_date = datetime.date(2005, 1, 1)
    #   end_date = datetime.date(2005, 3, 31)
    #   Entry.objects.filter(pub_date__range=(start_date, end_date)) ==> use something like this

class TimelineEventView(viewsets.ModelViewSet):#id abstract 
  serializer_class = TimelineEventSerializer
  queryset = TimelineEvent.objects.all()
  # def get_queryset(self):
  #   searchBy = self.kwargs['searchBy']
  #   searchText = self.kwargs['searchText']
  #   if searchBy == 'id':
  #     return Timeline.objects.filter(id__icontains = searchText)
  #   elif searchBy == 'abstract':
  #     return Timeline.objects.filter(abstract__title__icontains = searchText)

class OpinionView(viewsets.ModelViewSet):
  serializer_class = OpinionSerializer
  queryset = Opinion.objects.all()
  # def get_queryset(self):
  #   searchBy = self.kwargs['searchBy']
  #   searchText = self.kwargs['searchText']
  #   if searchBy == 'id':
  #     return Opinion.objects.filter(id__icontains = searchText)
  #   elif searchBy == 'user':
  #     return Opinion.objects.filter(user__icontains = searchText)
  #   elif searchBy == 'discussions':
  #     return Opinion.objects.filter(discussions__id__icontains = searchText)
  #   elif searchBy == 'upvote':
  #     return Opinion.objects.filter(upvote = int(searchText))

class LocationInfoView(viewsets.ModelViewSet):
  serializer_class = LocationInfoSerializer
  queryset = LocationInfo.objects.all()
  # def get_queryset(self):
  #   searchBy = self.kwargs['searchBy']
  #   searchText = self.kwargs['searchText']
  #   if searchBy == 'title':
  #     return Location.objects.filter(title__icontains = searchText)
  #   elif searchBy == 'user':
  #     return Opinion.objects.filter(user__icontains = searchText)
  #   elif searchBy == 'discussions':
  #     return Opinion.objects.filter(discussions__id__icontains = searchText)
  #   elif searchBy == 'upvote':
  #     return Opinion.objects.filter(upvote = int(searchText))

class CauseEffectView(viewsets.ModelViewSet):
  serializer_class = CauseEffectSerializer
  queryset = CauseEffect.objects.all()

class LocationShiftView(viewsets.ModelViewSet):
  serializer_class = LocationShiftSerializer
  queryset = LocationShift.objects.all()