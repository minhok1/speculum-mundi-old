from django.db import models
from django.contrib.auth import get_user_model
import uuid

class Entry(models.Model):
  id = models.UUIDField(primary_key=True, default=uuid.uuid4)
  title = models.CharField(max_length=120)
  timestamp = models.DateTimeField(auto_now=True)
  user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, blank=True, null=True)

  def _str_(self):
    return self.id

class DetailedEntry(Entry):
  content = models.TextField()
  image = models.ImageField(blank=True)
  source = models.URLField(blank=True)

class Abstract(DetailedEntry):
  LOCATION = "LOCATION"
  EVENT = "EVENT"
  PERSON = "PERSON"
  IDEA = "IDEA"
  COUNTRY = "COUNTRY"
  ORGANIZATION = "ORGANIZATION"
  ARTIFACT = "ARTIFACT"
  MANUSCRIPT = "MANUSCRIPT"

  ABSTRACT_TYPES = (
                    (LOCATION, 'Location'),
                    (EVENT, 'Event'),
                    (PERSON, 'Person'),
                    (IDEA, 'Idea'),
                    (COUNTRY, 'Country'),
                    (ORGANIZATION, 'Organization'),
                    (ARTIFACT, 'Artifact'),
                    (MANUSCRIPT, 'Manuscript'),
                   )
  type = models.CharField(max_length=30, choices=ABSTRACT_TYPES, default=EVENT)

class TimelineEvent(DetailedEntry):
  event_year = models.IntegerField(blank=True, null=True)
  event_month = models.IntegerField(blank=True, null=True)
  event_date = models.IntegerField(blank=True, null=True)
  context = models.ManyToManyField(Abstract, blank=True) #abstract that this timeline event belongs to
  
  def get_context(self):
    return ", ".join([str(context_object) for context_object in self.context.all()])

class LocationInfo(models.Model): #information only for 'location' abstracts - therefore only exists for abstract with type 'location'
  location = models.OneToOneField(Abstract, on_delete=models.CASCADE) #reference to the 'location' abstract that this info describes
  x_coordinate = models.FloatField()
  y_coordinate = models.FloatField()
  geography = models.TextField()
  # timeline_event = models.ManyToManyField(TimelineEvent, blank=True) # This was removed because this can be dealt with by finding whether a timeline event is included in the timeline of a 'location' abstract (e.g. 'black death lands in Feodosia' included in both 'black death' event and 'feodosia' location)

class CauseEffect(Entry): # this model is for timeline events between 2 streams, so different from below
  cause = models.ForeignKey(TimelineEvent, related_name='cause', on_delete=models.CASCADE)
  effect = models.ForeignKey(TimelineEvent, related_name='effect', on_delete=models.CASCADE)

class LocationShift(Entry): # this model is for location shift between 2 timeline events in the same timeline
  origin_timeline_event = models.ForeignKey(TimelineEvent, related_name="origin_node", on_delete=models.CASCADE) #foreignkey instead of onetoone because even though this is for the timeline events in a linear, same timeline event could be in different streams
  destination_timeline_event = models.ForeignKey(TimelineEvent, related_name="destination_node", on_delete=models.CASCADE)

class Discussion(Entry): #only one of these will be populated
  abstract_context = models.ForeignKey(Abstract, on_delete=models.CASCADE, related_name="abstract_context", null=True, blank=True)
  timeline_event_context = models.ForeignKey(TimelineEvent, on_delete=models.CASCADE, related_name="timeline_event_context", null=True, blank=True)
  cause_effect_context = models.ForeignKey(CauseEffect, on_delete=models.CASCADE, related_name="cause_effect_context", null=True, blank=True)
  location_shift_context = models.ForeignKey(LocationShift, on_delete=models.CASCADE, related_name="location_shift_context", null=True, blank=True)

class Opinion(DetailedEntry):
  upvotes = models.IntegerField(blank=True)
  thread = models.ForeignKey(Discussion, on_delete=models.CASCADE, related_name="thread")