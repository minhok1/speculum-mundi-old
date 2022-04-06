from django.shortcuts import render
from rest_framework import viewsets
from .serializers import SummarySerializer, DiscussionSerializer
from .models import Summary, Discussion

# Create your views here.

class SummaryView(viewsets.ModelViewSet):
  serializer_class = SummarySerializer
  queryset = Summary.objects.all()

class DiscussionView(viewsets.ModelViewSet):
  serializer_class = DiscussionSerializer
  queryset = Discussion.objects.all()