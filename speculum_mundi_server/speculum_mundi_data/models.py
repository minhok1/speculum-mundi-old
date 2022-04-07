from django.db import models
import uuid

# Create your models here.

class Discussion(models.Model): #Basically each discussion thread
  id = models.UUIDField(primary_key=True, default=uuid.uuid4, help_text='Unique ID for discussion')
  user = models.CharField(max_length=120) #This user created this discussion
  timestamp = models.CharField(max_length=120)
  thread = models.TextField() #Topic of discussion

  def _str_(self):
    return self.id

class Abstract(models.Model):
  title = models.CharField(max_length=120)
  type = models.CharField(max_length=120)
  summary = models.TextField()
  discussions = models.ManyToManyField(Discussion)

  def _str_(self):
    return self.title
  
  def get_discussions(self):
    return "\n".join([d.id for d in self.discussions.all()])

class Timeline(models.Model):
  id = models.UUIDField(primary_key=True, default=uuid.uuid4, help_text='Unique ID for timeline object')
  abstract = models.ForeignKey(Abstract, on_delete=models.CASCADE)
  title = models.CharField(max_length=120)
  time = models.CharField(max_length=120)
  content = models.TextField()
  discussions = models.ManyToManyField(Discussion) #whether this should be a part of abstract

  def _str_(self):
    return self.id
  
  def get_discussions(self):
    return "\n".join([d.id for d in self.discussions.all()])

class Opinion(models.Model):
  id = models.UUIDField(primary_key=True, default=uuid.uuid4, help_text='Unique ID for opinion in a discussion')
  user = models.CharField(max_length=120)
  timestamp = models.CharField(max_length=120)
  discussions = models.ForeignKey(Discussion, on_delete=models.CASCADE) #which discussion does this opinion belong to
  content = models.TextField()
  sources = models.URLField(max_length=120)
  images = models.ImageField()

  def _str_(self):
    return self.id


class Location(models.Model): #may not exist if abstract is also location
  title = models.CharField(max_length=120)
  timeline = models.ForeignKey(Timeline, on_delete=models.CASCADE)
  terrain = models.TextField()
  climate = models.TextField()
  discussions = models.ManyToManyField(Discussion) #whether/how much this location affected a timeline obj

  def _str_(self):
    return self.title
  
  def get_discussions(self):
    return "\n".join([d.id for d in self.discussions.all()])

#timeline relational from this point

class TimelineToTimeline(models.Model):
  id = models.UUIDField(primary_key=True, default=uuid.uuid4, help_text='Unique ID for timeline-timeline relationship')
  cause = models.ForeignKey(Timeline, on_delete=models.CASCADE, related_name='cause')
  result = models.ForeignKey(Timeline, on_delete=models.CASCADE, related_name='result')
  discussions = models.ManyToManyField(Discussion)

  def _str_(self):
    return self.id
  
  def get_discussions(self):
    return "\n".join([d.id for d in self.discussions.all()])

class AbstractToTimeline(models.Model):
  id = models.UUIDField(primary_key=True, default=uuid.uuid4, help_text='Unique ID for abstract-timeline relationship')
  cause = models.ForeignKey(Abstract, on_delete=models.CASCADE)
  result = models.ForeignKey(Timeline, on_delete=models.CASCADE)
  discussions = models.ManyToManyField(Discussion)

  def _str_(self):
    return self.id
  
  def get_discussions(self):
    return "\n".join([d.id for d in self.discussions.all()])

class TimelineToAbstract(models.Model):
  id = models.UUIDField(primary_key=True, default=uuid.uuid4, help_text='Unique ID for timeline-abstract relationship')
  cause = models.ForeignKey(Timeline, on_delete=models.CASCADE)
  result = models.ForeignKey(Abstract, on_delete=models.CASCADE)
  discussions = models.ManyToManyField(Discussion)

  def _str_(self):
    return self.id
  
  def get_discussions(self):
    return "\n".join([d.id for d in self.discussions.all()])