from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models

class UserManager(BaseUserManager):

  def create_user(self, username, email, password, **kwargs):
    """Create and return a `User` with an email, phone number, username and password."""
    if username is None:
      raise TypeError('Users must have a username.')
    if password is None:
      raise TypeError('Users must have a password.')
    if email is None:
      raise TypeError('Users must have an email.')

    user = self.model(username=username, email=self.normalize_email(email))
    user.set_password(password)
    user.save(using=self._db)

    return user

  def create_superuser(self, username, email, password):
    """
    Create and return a `User` with superuser (admin) permissions.
    """
    if password is None:
      raise TypeError('Superusers must have a password.')
    if email is None:
      raise TypeError('Superusers must have an email.')
    if username is None:
      raise TypeError('Superusers must have a username.')

    user = self.create_user(username, email, password)
    user.is_superuser = True
    user.is_staff = True
    user.save(using=self._db)

    return user

class CustomUser(AbstractUser):
  email = models.CharField(max_length=120)
  is_staff = models.BooleanField(default=False)
  objects = UserManager()
  class Meta:
    db_table = 'auth_user'
  def __str__(self):
        return f"{self.email}"