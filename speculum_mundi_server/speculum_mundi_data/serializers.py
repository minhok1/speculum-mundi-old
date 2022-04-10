from rest_framework import serializers
from .models import Abstract, Discussion, TimelineEvent, Opinion, LocationInfo, CauseEffect, LocationShift

class AbstractSerializer(serializers.ModelSerializer):
  class Meta:
    model = Abstract
    fields = ('id', 'title', 'timestamp', 'user', 'content', 'image', 'source', 'type', 'discussions')

class DiscussionSerializer(serializers.ModelSerializer):
  class Meta:
    model = Discussion
    fields = ('id', 'title', 'timestamp', 'user', 'context')

class TimelineEventSerializer(serializers.ModelSerializer):
  class Meta:
    model = TimelineEvent
    fields = ('id', 'title', 'timestamp', 'user', 'content', 'image', 'source', 'context', 'discussions')

class OpinionSerializer(serializers.ModelSerializer):
  class Meta:
    model = Opinion
    fields = ('id', 'title', 'timestamp', 'user', 'content', 'image', 'source', 'upvotes', 'thread')

class LocationInfoSerializer(serializers.ModelSerializer):
  class Meta:
    model = LocationInfo
    fields = ('location', 'x_coordinate', 'y_coordinate', 'geography', 'timeline_event')

class CauseEffectSerializer(serializers.ModelSerializer):
  class Meta:
    model = CauseEffect
    fields = ('id', 'title', 'timestamp', 'user', 'cause', 'effect', 'discussions')

class LocationShiftSerializer(serializers.ModelSerializer):
  class Meta:
    model = LocationShift
    fields = ('id', 'title', 'timestamp', 'user', 'origin', 'destination', 'origin_timeline_event', 'destination_timeline_event', 'discussions')
