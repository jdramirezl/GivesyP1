from django.shortcuts import render, redirect
from .models import Producto
from .forms import ProductoForm
from django.http import HttpResponse


def crear_producto(request):
    form = ProductoForm()
    
    if request.method == 'POST':
        form = ProductoForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('') # TODO INDEX
        else:
            return HttpResponse("""your form is wrong, reload on <a href = "{{ url : 'index'}}">reload</a>""")
    else:
        return render(request, 'HTML', {'form':form})

def editar_producto(request, producto_id):
    producto_id = int(producto_id)
    
    try:
        producto = Producto.objects.get(id = producto_id)
    except Producto.DoesNotExist:
        return redirect('') # TODO INDEX

    form = ProductoForm(request.POST or None, instance = producto)
    
    if form.is_valid():
        form.save()
        return redirect('') # TODO INDEX
    
    return render(request, 'HTML', {'form':form})

def borrar_producto(request, producto_id):
    producto_id = int(producto_id)
    
    try:
        producto = Producto.objects.get(id = producto_id)
    except Producto.DoesNotExist:
        return redirect('') # TODO INDEX
    
    producto.delete()
    return redirect('') # TODO INDEX