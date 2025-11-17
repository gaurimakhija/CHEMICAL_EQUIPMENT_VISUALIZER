from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    csv_upload_limit = models.IntegerField(default=5)
    

    pass