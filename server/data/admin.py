from django.contrib import admin
from .models import Abstract, Discussion, TimelineEvent, Opinion, LocationInfo, CauseEffect, LocationShift, UserSave

class AbstractAdmin(admin.ModelAdmin):
  list_display = ('id', 'title', 'timestamp', 'user', 'shared', 'content', 'image', 'source', 'type')

class DiscussionAdmin(admin.ModelAdmin):
  list_display = ('id', 'title', 'timestamp', 'user', 'shared', 'abstract_context', 'timeline_event_context', 'cause_effect_context', 'location_shift_context')

class TimelineEventAdmin(admin.ModelAdmin):
  list_display = ('id', 'title', 'timestamp', 'user', 'shared', 'content', 'image', 'source', 'event_year', 'event_month', 'event_date', 'get_context', 'location')

class OpinionAdmin(admin.ModelAdmin):
  list_display = ('id', 'title', 'timestamp', 'user', 'shared', 'content', 'image', 'source', 'stance', 'upvotes', 'thread')

class LocationInfoAdmin(admin.ModelAdmin):
  list_display = ('location', 'x_coordinate', 'y_coordinate', 'geography')
  
class CauseEffectAdmin(admin.ModelAdmin):
  list_display = ('id', 'title', 'timestamp', 'user', 'shared', 'cause', 'effect')

class LocationShiftAdmin(admin.ModelAdmin):
  list_display = ('id', 'title', 'timestamp', 'user', 'shared', 'origin_timeline_event', 'destination_timeline_event')

class UserSaveAdmin(admin.ModelAdmin):
  list_display = ('user', 'saved_abstracts', 'temp_abstracts', 'temp_timeline_event', 'temp_cause_effect', 'temp_location_shift', 'temp_discussion', 'temp_opinion')

# Register your models here.

admin.site.register(Abstract, AbstractAdmin)
admin.site.register(Discussion, DiscussionAdmin)
admin.site.register(TimelineEvent, TimelineEventAdmin)
admin.site.register(Opinion, OpinionAdmin)
admin.site.register(LocationInfo, LocationInfoAdmin)
admin.site.register(CauseEffect, CauseEffectAdmin)
admin.site.register(LocationShift, LocationShiftAdmin)
admin.site.register(UserSave, UserSaveAdmin)