from rest_framework import serializers
from .models import (Orden, Imagen, Categoria)

class OrdenSerializer(serializers.ModelSerializer):

    class Meta:
        model = Orden
        fields = '__all__'

class ImagenSerializer(serializers.ModelSerializer):

    class Meta:
        model = Imagen
        fields = '__all__'

class CategoriaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Categoria
        fields = '__all__'
