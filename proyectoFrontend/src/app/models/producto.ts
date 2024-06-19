export class Producto {
    _id!: string;
    nombre: string;
    descripcion: string;
    imagen: string;
    precio!: number;
    stock!: number;
    destacado: boolean;

    constructor() {
        this.nombre = '';
        this.descripcion = '';
        this.imagen = '';
        this.destacado = false;
    }
}