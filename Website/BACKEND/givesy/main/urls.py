from django.urls import path, include
from rest_framework import routers
from .views import (UserView, ProductoView, CategoriaView, ImagenView, OrdenView)
from . import views

router = routers.DefaultRouter()
router.register('user', UserView, 'city')
router.register('producto', ProductoView, 'city')
router.register('categoria', CategoriaView, 'city')
router.register('imagen', ImagenView, 'city')
router.register('orden', OrdenView, 'city')


urlpatterns = [
    
]

urlpatterns += router.urls