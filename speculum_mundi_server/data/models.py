from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.fields import GenericRelation
from django.contrib.contenttypes.models import ContentType
from django.contrib.auth import get_user_model
import uuid

class Entry(models.Model):
  id = models.UUIDField(primary_key=True, default=uuid.uuid4)
  title = models.CharField(max_length=120)
  timestamp = models.DateTimeField(auto_now=True)
  user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)

  def _str_(self):
    return self.id

class DetailedEntry(Entry):
  content = models.TextField()
  image = models.ImageField(blank=True)
  source = models.URLField(blank=True)

class Discussion(Entry):
  content_type = models.ForeignKey(ContentType, related_name="content_type_discussions", on_delete=models.CASCADE)
  object_id = models.PositiveIntegerField()
  context = GenericForeignKey("content_type", "object_id")

class Opinion(DetailedEntry):
  upvotes = models.IntegerField(blank=True)
  thread = models.ForeignKey(Discussion, on_delete=models.CASCADE, related_name="thread")

class Abstract(DetailedEntry):
  LOCATION = "LOCATION"
  EVENT = "EVENT"
  PERSON = "PERSON"
  IDEA = "IDEA"
  ORGANIZATION = "ORGANIZATION"
  ARTIFACT = "ARTIFACT"
  MANUSCRIPT = "MANUSCRIPT"

  ABSTRACT_TYPES = (
                    (LOCATION, 'Location'),
                    (EVENT, 'Event'),
                    (PERSON, 'Person'),
                    (IDEA, 'Idea'),
                    (ORGANIZATION, 'Organization'),
                    (ARTIFACT, 'Artifact'),
                    (MANUSCRIPT, 'Manuscript'),
                   )
  type = models.CharField(max_length=30, choices=ABSTRACT_TYPES, default=EVENT)
  discussions = GenericRelation(Discussion, content_type_field='content_type',
        object_id_field='object_id', related_query_name='abstract', blank=True)

class TimelineEvent(DetailedEntry):
  context = models.ManyToManyField(Abstract, blank=True) #abstract that this timeline event belongs to
  discussions = discussions = GenericRelation(Discussion ,content_type_field='content_type',
        object_id_field='object_id', related_query_name='timeline', blank=True)
  
  def get_context(self):
    return ", ".join([str(context_object) for context_object in self.context.all()])

class LocationInfo(models.Model): #information only for 'location' abstracts - therefore only exists for abstract with type 'location'
  location = models.OneToOneField(Abstract, on_delete=models.CASCADE) #reference to the 'location' abstract that this info describes
  x_coordinate = models.FloatField()
  y_coordinate = models.FloatField()
  geography = models.TextField()
  timeline_event = models.ManyToManyField(TimelineEvent, blank=True) #timeline event that took place at the 'location' abstract that this info refers to

  def get_timeline_event(self):
    return ", ".join([str(te) for te in self.timeline_event.all()])

#Relational

class CauseEffect(Entry):
  cause = models.ForeignKey(TimelineEvent, related_name='cause', on_delete=models.CASCADE)
  effect = models.ForeignKey(TimelineEvent, related_name='effect', on_delete=models.CASCADE)
  discussions = discussions = GenericRelation(Discussion ,content_type_field='content_type',
        object_id_field='object_id', related_query_name='causeeffect', blank=True)

class LocationShift(Entry): # 2 'location' objects and a timeline events associated (that may not exist) => this model is for location shift between 2 timeline events in the same timeline
  origin_timeline_event = models.ForeignKey(TimelineEvent, related_name="origin_node", on_delete=models.CASCADE) #onetoone because linear
  destination_timeline_event = models.ForeignKey(TimelineEvent, related_name="destination_node", on_delete=models.CASCADE)
  discussions = discussions = GenericRelation(Discussion ,content_type_field='content_type',
        object_id_field='object_id', related_query_name='locationshift', blank=True)