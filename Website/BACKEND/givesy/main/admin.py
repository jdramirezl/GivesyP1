from django.contrib import admin
from .models import Categoria, Imagen, Orden
from accounts.models import User

admin.site.register(User)
admin.site.register(Categoria)
admin.site.register(Imagen)
admin.site.register(Orden)
