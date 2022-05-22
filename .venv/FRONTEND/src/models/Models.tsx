export interface ProductoModel {
    id: number;
    titulo: string;
    slug: string;
    descripcion: string;
    categoria: number;
    vendedor: number;
    destacado: boolean;
    creado: string;
    actualizado: string;
    estado: string;
}

export interface ImagenModel {
    id: number;
    imagen: string;
    producto: number;
}

export interface UserModel {
    id: number;
    first_name: string;
    last_name: string;
}

export interface CategoriaModel {
    id: number;
    nombre: string;
}