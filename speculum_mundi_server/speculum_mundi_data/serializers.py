from rest_framework import serializers
from .models import Abstract, Discussion, Timeline, Opinion, Location, TimelineToTimeline, TimelineToAbstract, AbstractToTimeline

class AbstractSerializer(serializers.ModelSerializer):
  class Meta:
    model = Abstract
    fields = ('title', 'type', 'summary', 'discussions')

class DiscussionSerializer(serializers.ModelSerializer):
  class Meta:
    model = Discussion
    fields = ('id', 'user', 'timestamp', 'thread')

class TimelineSerializer(serializers.ModelSerializer):
  class Meta:
    model = Timeline
    fields = ('id', 'abstract', 'title', 'time', 'content', 'discussions')

class OpinionSerializer(serializers.ModelSerializer):
  class Meta:
    model = Opinion
    fields = ('id', 'user', 'timestamp', 'discussions', 'content', 'sources', 'images', 'upvote')

class LocationSerializer(serializers.ModelSerializer):
  class Meta:
    model = Location
    fields = ('title', 'timeline', 'geography', 'terrain', 'climate', 'discussions')

class TimelineToTimelineSerializer(serializers.ModelSerializer):
  class Meta:
    model = TimelineToTimeline
    fields = ('id', 'cause', 'result', 'discussions')

class TimelineToAbstractSerializer(serializers.ModelSerializer):
  class Meta:
    model = TimelineToAbstract
    fields = ('id', 'cause', 'result', 'discussions')

class AbstractToTimelineSerializer(serializers.ModelSerializer):
  class Meta:
    model = AbstractToTimeline
    fields = ('id', 'cause', 'result', 'discussions')

