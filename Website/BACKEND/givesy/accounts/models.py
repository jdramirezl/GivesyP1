from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    class Roles(models.TextChoices):
        vendedor = "Vendedor"
        comprador = "Comprador"

    rol = models.CharField(choices=Roles.choices, default=Roles.vendedor, max_length=20)

    def __str__(self):
        return f"User: {self.first_name} {self.last_name}"