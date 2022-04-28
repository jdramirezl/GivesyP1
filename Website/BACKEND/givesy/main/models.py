from django.db import models
from autoslug import AutoSlugField

class Categoria(models.Model):
    nombre = models.CharField(max_length=255)
    slug = AutoSlugField(populate_from='titulo', unique=True)

    def __str__(self):
        return f"Categoria: {self.nombre}"


class Imagen(models.Model):
    imagen = models.ImageField(upload_to='media/')
    producto = models.ForeignKey("producto.Producto", on_delete=models.CASCADE)

    def __str__(self):
        return f"image for product: {self.producto.titulo}"


class Orden(models.Model):
    class Estados(models.TextChoices):
        reservado = "reservado"
        comprado = "comprado"
        entregado = "entregado"

    producto = models.ForeignKey("producto.Producto", on_delete=models.CASCADE)
    comprador = models.ForeignKey("accounts.User", on_delete=models.CASCADE)
    estado = models.CharField(choices=Estados.choices, default=Estados.reservado, max_length=20)

    def __str__(self):
        return f"Producto: {self.producto.titulo} del User: {self.producto.vendedor.first_name}, para el User: {self.comprador.first_name}"
