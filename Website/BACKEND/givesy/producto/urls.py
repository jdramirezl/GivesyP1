from django.urls import path

from . import views

urlpatterns = [
    path('crear/', views.crear_producto, name = 'crear_producto'),
    path('editar/<int:producto_id>', views.editar_producto, name = 'editar_producto'),
    path('borrar/<int:producto_id>', views.borrar_producto, name = 'borrar_producto'),
]