from django.contrib import admin
from .models import Abstract, Discussion, Timeline, Opinion, Location, TimelineToTimeline, TimelineToAbstract, AbstractToTimeline

class AbstractAdmin(admin.ModelAdmin):
  list_display = ('title', 'type', 'summary', 'get_discussions')

class DiscussionAdmin(admin.ModelAdmin):
  list_display = ('id', 'user', 'timestamp', 'thread')

class TimelineAdmin(admin.ModelAdmin):
  list_display = ('id', 'get_abstract', 'title', 'time', 'content', 'get_discussions')

class OpinionAdmin(admin.ModelAdmin):
  list_display = ('id', 'user', 'timestamp', 'discussions', 'content', 'sources', 'images')

class LocationAdmin(admin.ModelAdmin):
  list_display = ('title', 'timeline', 'geography', 'terrain', 'climate', 'get_discussions')
  
class TimelineToTimelineAdmin(admin.ModelAdmin):
  list_display = ('id', 'cause', 'result', 'get_discussions')

class TimelineToAbstractAdmin(admin.ModelAdmin):
  list_display = ('id', 'cause', 'result', 'get_discussions')

class AbstractToTimelineAdmin(admin.ModelAdmin):
  list_display = ('id', 'cause', 'result', 'get_discussions')

# Register your models here.

admin.site.register(Abstract, AbstractAdmin)
admin.site.register(Discussion, DiscussionAdmin)
admin.site.register(Timeline, TimelineAdmin)
admin.site.register(Opinion, OpinionAdmin)
admin.site.register(Location, LocationAdmin)
admin.site.register(TimelineToTimeline, TimelineToTimelineAdmin)
admin.site.register(TimelineToAbstract, TimelineToAbstractAdmin)
admin.site.register(AbstractToTimeline, AbstractToTimelineAdmin)