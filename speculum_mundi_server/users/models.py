from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
  email = models.CharField(max_length=120)
  class Meta:
    db_table = 'auth_user'