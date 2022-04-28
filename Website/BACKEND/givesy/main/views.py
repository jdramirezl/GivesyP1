from django.shortcuts import render
from django.utils.text import slugify
from django.http import HttpResponse
from .models import Categoria, Imagen, Orden
from accounts.models import User
from producto.models import Producto


def index(req):
    # MOSTRAMOS TODOS LOS PRODUCTOS
    categorias = Categoria.objects.all()
    productos = Producto.objects.filter(estado="activo")
    context = {"productos": productos, "categorias": categorias}

    return HttpResponse(context)
    # return render(req, context)


def filtrar(req, slug):
    if Categoria.objects.filter(slug=slug).exists():
        categorias = Categoria.objects.get(slug=slug)
    else:
        categorias = None

    if categorias and Producto.objects.filter(slug=slug).exists():
        productos_filt = Producto.objects.filter(activo=True, categoria=categorias)
    else:
        productos_filt = None

    context = {"productos": productos_filt, " categorias": categorias}
    return HttpResponse(context)
    # return render(req, context)


def buscar(req):
    # Si buscan por la barra
    name = req.GET()
    productos = Producto.objects.filter(activo=True, nombre__icontains=name)
    categorias = Categoria.objects.filter(activo=True)
    context = {"productos": productos, "categorias": categorias}
    return render(req, context)


def detail(req, slug):
    # Un solo producto!
    if Producto.objects.filter(activo=True, slug=slug).exists():
        producto = Producto.objects.get(activo=True, slug=slug)
        context = {"productos": None}
        if req.user.is_authenticated():
            if req.user == producto.vendedor:
                context = {"productos": producto}
                return render(req, context)
            else:
                return render(req, context)
        else:
            return render(req, context)


def profile(req, user_id):
    context = {"user_id": user_id}
    if req.user.is_authenticated():
        if req.user.id == user_id:
            comprados = Orden.objects.filter(comprador=req.user).values('producto')
            vendidos = Producto.object.filter(vendedor=req.user)
            context = {'nombre': req.user.first_name, 'comprados': comprados, 'vendidos': vendidos}
            return HttpResponse(context)
        else:
            context = {'nombre': req.user.first_name}
            return HttpResponse(context)
    return HttpResponse(context)
