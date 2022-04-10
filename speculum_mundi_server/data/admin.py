from django.contrib import admin
from .models import Entry, DetailedEntry, Abstract, Discussion, TimelineEvent, Opinion, LocationInfo, CauseEffect, LocationShift

class EntryAdmin(admin.ModelAdmin):
  list_display = ('id', 'title', 'timestamp', 'user')

class DetailedEntryAdmin(admin.ModelAdmin):
  list_display = ('id', 'title', 'timestamp', 'user', 'content', 'image', 'source')

class AbstractAdmin(admin.ModelAdmin):
  list_display = ('id', 'title', 'timestamp', 'user', 'content', 'image', 'source', 'type', 'discussions')

class DiscussionAdmin(admin.ModelAdmin):
  list_display = ('id', 'title', 'timestamp', 'user', 'context')

class TimelineEventAdmin(admin.ModelAdmin):
  list_display = ('id', 'title', 'timestamp', 'user', 'content', 'image', 'source', 'get_context', 'discussions')

class OpinionAdmin(admin.ModelAdmin):
  list_display = ('id', 'title', 'timestamp', 'user', 'content', 'image', 'source', 'upvotes', 'thread')

class LocationInfoAdmin(admin.ModelAdmin):
  list_display = ('location', 'x_coordinate', 'y_coordinate', 'geography', 'timeline_event')
  
class CauseEffectAdmin(admin.ModelAdmin):
  list_display = ('id', 'title', 'timestamp', 'user', 'cause', 'effect', 'discussions')

class LocationShiftAdmin(admin.ModelAdmin):
  list_display = ('id', 'title', 'timestamp', 'user', 'origin', 'destination', 'origin_timeline_event', 'destination_timeline_event', 'discussions')

# Register your models here.

admin.site.register(Abstract, AbstractAdmin)
admin.site.register(Discussion, DiscussionAdmin)
admin.site.register(TimelineEvent, TimelineEventAdmin)
admin.site.register(Opinion, OpinionAdmin)
admin.site.register(LocationInfo, LocationInfoAdmin)
admin.site.register(CauseEffect, CauseEffectAdmin)
admin.site.register(LocationShift, LocationShiftAdmin)