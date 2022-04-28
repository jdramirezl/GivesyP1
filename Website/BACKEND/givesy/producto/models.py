from django.db import models
from autoslug import AutoSlugField

# Create your models here.
class Producto(models.Model):
    class Estados(models.TextChoices):
        activo = "activo"
        vendido = "vendido"
        desactivado = "desactivado"

    titulo = models.CharField(max_length=30)
    slug = AutoSlugField(populate_from='titulo', unique=True)
    descripcion = models.TextField(blank=False, null=False)
    categoria = models.ForeignKey("main.Categoria", on_delete=models.CASCADE)
    vendedor = models.ForeignKey("accounts.User", on_delete=models.CASCADE)
    destacado = models.BooleanField()
    creado = models.DateTimeField(auto_now_add=True)
    actualizado = models.DateTimeField(auto_now=True)
    estado = models.CharField(choices=Estados.choices, default=Estados.activo, max_length=20)

    def __str__(self):
        return f"Producto: {self.titulo}"