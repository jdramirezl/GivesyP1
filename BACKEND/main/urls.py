from django.urls import path, include
from rest_framework import routers
from .views import (UserView, ProductoView, CategoriaView, ImagenView, OrdenView)
from . import views

router = routers.DefaultRouter()
router.register('user', UserView, 'user')
router.register('producto', ProductoView, 'producto')
router.register('categoria', CategoriaView, 'categoria')
router.register('imagen', ImagenView, 'imagen')
router.register('orden', OrdenView, 'orden')


urlpatterns = []

urlpatterns += router.urls