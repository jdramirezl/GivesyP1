from rest_framework import serializers
from .models import (Orden, Imagen, Categoria)

class OrdenSerializer(serializers.ModelSerializer):

    class Meta:
        model = Orden
        fields = '__all__'

class ImagenSerializer(serializers.ModelSerializer):
    imagen = serializers.ImageField(max_length=None, allow_empty_file=False, allow_null=False, use_url=True, required=False)
    class Meta:
        model = Imagen
        fields = ('id', 'imagen', 'producto')

class CategoriaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Categoria
        fields = '__all__'
