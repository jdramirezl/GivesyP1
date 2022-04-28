from django.utils.text import slugify
from .models import Categoria, Imagen, Orden
from accounts.models import User
from producto.models import Producto
from .serializers import (CategoriaSerializer, ImagenSerializer, OrdenSerializer)
from producto.serializers import ProductoSerializer
from accounts.serializers import UserSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets

class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    filter_backends = [DjangoFilterBackend]
    
    filterset_fields = '__all__'
    def get_queryset(self):
        queryset = User.objects.all()
        return queryset

class ProductoView(viewsets.ModelViewSet):
    serializer_class = ProductoSerializer
    filter_backends = [DjangoFilterBackend]
    
    filterset_fields = '__all__'
    def get_queryset(self):
        queryset = Producto.objects.all()
        return queryset

class CategoriaView(viewsets.ModelViewSet):
    serializer_class = CategoriaSerializer
    filter_backends = [DjangoFilterBackend]
    
    filterset_fields = '__all__'
    def get_queryset(self):
        queryset = Categoria.objects.all()
        return queryset

class ImagenView(viewsets.ModelViewSet):
    serializer_class = ImagenSerializer
    filter_backends = [DjangoFilterBackend]
    
    filterset_fields = '__all__'
    def get_queryset(self):
        queryset = Imagen.objects.all()
        return queryset

class OrdenView(viewsets.ModelViewSet):
    serializer_class = OrdenSerializer
    filter_backends = [DjangoFilterBackend]
    
    filterset_fields = '__all__'
    def get_queryset(self):
        queryset = Orden.objects.all()
        return queryset
