from django import forms
from .models import Producto

class ProductoForm(forms.Form):
    
    class Meta:
        model = Producto
        fields = '__all__'