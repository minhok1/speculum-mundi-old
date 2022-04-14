from django.contrib import admin
from .models import Abstract, Discussion, TimelineEvent, Opinion, LocationInfo, CauseEffect, LocationShift

class AbstractAdmin(admin.ModelAdmin):
  list_display = ('id', 'title', 'timestamp', 'user', 'content', 'image', 'source', 'type')

class DiscussionAdmin(admin.ModelAdmin):
  list_display = ('id', 'title', 'timestamp', 'user', 'abstract_context', 'timeline_event_context', 'cause_effect_context', 'location_shift_context')

class TimelineEventAdmin(admin.ModelAdmin):
  list_display = ('id', 'title', 'timestamp', 'user', 'content', 'image', 'source', 'event_year', 'event_month', 'event_date', 'get_context')

class OpinionAdmin(admin.ModelAdmin):
  list_display = ('id', 'title', 'timestamp', 'user', 'content', 'image', 'source', 'upvotes', 'thread')

class LocationInfoAdmin(admin.ModelAdmin):
  list_display = ('location', 'x_coordinate', 'y_coordinate', 'geography')
  
class CauseEffectAdmin(admin.ModelAdmin):
  list_display = ('id', 'title', 'timestamp', 'user', 'cause', 'effect')

class LocationShiftAdmin(admin.ModelAdmin):
  list_display = ('id', 'title', 'timestamp', 'user', 'origin_timeline_event', 'destination_timeline_event')

# Register your models here.

admin.site.register(Abstract, AbstractAdmin)
admin.site.register(Discussion, DiscussionAdmin)
admin.site.register(TimelineEvent, TimelineEventAdmin)
admin.site.register(Opinion, OpinionAdmin)
admin.site.register(LocationInfo, LocationInfoAdmin)
admin.site.register(CauseEffect, CauseEffectAdmin)
admin.site.register(LocationShift, LocationShiftAdmin)