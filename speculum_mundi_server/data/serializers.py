from rest_framework import serializers
from .models import Abstract, Discussion, TimelineEvent, Opinion, LocationInfo, CauseEffect, LocationShift

class AbstractSerializer(serializers.ModelSerializer):
  class Meta:
    model = Abstract
    fields = ('id', 'title', 'timestamp', 'user', 'content', 'image', 'source', 'type')

class DiscussionSerializer(serializers.ModelSerializer):
  class Meta:
    model = Discussion
    fields = ('id', 'title', 'timestamp', 'user', 'abstract_context', 'timeline_event_context', 'cause_effect_context', 'location_shift_context')

class TimelineEventSerializer(serializers.ModelSerializer):
  class Meta:
    model = TimelineEvent
    fields = ('id', 'title', 'timestamp', 'user', 'content', 'image', 'source', 'event_year', 'event_month', 'event_date', 'context')

class OpinionSerializer(serializers.ModelSerializer):
  class Meta:
    model = Opinion
    fields = ('id', 'title', 'timestamp', 'user', 'content', 'image', 'source', 'upvotes', 'thread')

class LocationInfoSerializer(serializers.ModelSerializer):
  class Meta:
    model = LocationInfo
    fields = ('location', 'x_coordinate', 'y_coordinate', 'geography')

class CauseEffectSerializer(serializers.ModelSerializer):
  class Meta:
    model = CauseEffect
    fields = ('id', 'title', 'timestamp', 'user', 'cause', 'effect')

class LocationShiftSerializer(serializers.ModelSerializer):
  class Meta:
    model = LocationShift
    fields = ('id', 'title', 'timestamp', 'user', 'origin_timeline_event', 'destination_timeline_event')