from django.urls import path, include
from . import views
from producto import urls as producto_urls

urlpatterns = [
    path('', views.index, name='index'),
    path('<slug:slug>/filtro', views.filtrar, name='filtrar'),
    path('<slug:slug>/buscar', views.buscar, name='buscar'),
    path('<slug:slug>/detail', views.detail, name='detallar'),
    path('profile/<int:user_id>', views.detail, name='perfil'),
    path('producto/', include(producto_urls)),
]