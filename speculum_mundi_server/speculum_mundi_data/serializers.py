from rest_framework import serializers
from .models import Summary, Discussion

class SummarySerializer(serializers.ModelSerializer):
  class Meta:
    model = Summary
    fields = ('name','summarytype','introduction')

class DiscussionSerializer(serializers.ModelSerializer):
  class Meta:
    model = Discussion
    fields = ('user','timestamp','thread','content','source','topic')