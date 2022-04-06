from django.db import models

# Create your models here.

class Summary(models.Model):
  name = models.CharField(max_length=120)
  summarytype = models.CharField(max_length=120)
  introduction = models.TextField()

  def _str_(self):
    return self.name

class Discussion(models.Model):
  user = models.CharField(max_length=120)
  timestamp = models.CharField(max_length=120)
  thread = models.TextField()
  content = models.TextField()
  source = models.CharField(max_length=120)
  topic = models.ForeignKey(Summary, on_delete=models.CASCADE)

  def _str_(self):
    return self.timestamp