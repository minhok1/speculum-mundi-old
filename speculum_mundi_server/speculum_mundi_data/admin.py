from django.contrib import admin
from .models import Summary, Discussion

class SummaryAdmin(admin.ModelAdmin):
  list_display = ('name','summarytype','introduction')

class DiscussionAdmin(admin.ModelAdmin):
  list_display = ('user','timestamp','thread','content','source','topic')

# Register your models here.

admin.site.register(Summary, SummaryAdmin)
admin.site.register(Discussion, DiscussionAdmin)