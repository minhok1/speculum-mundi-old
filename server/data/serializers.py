from rest_framework import serializers
from .models import Abstract, Discussion, TimelineEvent, Opinion, LocationInfo, CauseEffect, LocationShift, UserSave, Diagram

class AbstractSerializer(serializers.ModelSerializer):
  class Meta:
    model = Abstract
    fields = ('id', 'title', 'timestamp', 'user', 'content', 'image', 'source', 'type')

class DiscussionSerializer(serializers.ModelSerializer):
  class Meta:
    model = Discussion
    fields = ('id', 'title', 'timestamp', 'user', 'abstract_context', 'timeline_event_context', 'cause_effect_context', 'location_shift_context')

class TimelineEventSerializer(serializers.ModelSerializer):
  context = serializers.PrimaryKeyRelatedField(many=True, queryset=Abstract.objects.all(), read_only=False)
  class Meta:
    model = TimelineEvent
    fields = ('id', 'title', 'timestamp', 'user', 'content', 'image', 'source', 'event_year', 'event_month', 'event_date', 'context', 'location')

class OpinionSerializer(serializers.ModelSerializer):
  class Meta:
    model = Opinion
    fields = ('id', 'title', 'timestamp', 'user', 'content', 'image', 'source', 'stance', 'upvotes', 'thread')

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

class UserSaveSerializer(serializers.ModelSerializer):
  class Meta:
    model = UserSave
    fields = ('user', 'saved_abstracts', 'temp_abstracts', 'temp_timeline_event', 'temp_cause_effect', 'temp_location_shift', 'temp_discussion', 'temp_opinion')

class DiagramSerializer(serializers.ModelSerializer):
  class Meta:
    model = Diagram
    fields = ('votes_min', 'votes_max', 'quotes_min', 'quotes_max', 'abstracts', 'diagram_filter', 'specified', 'user')