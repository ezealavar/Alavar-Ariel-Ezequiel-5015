export class Categoria {
    _id!: number;
    nombre: string;
    descripcion: string;

    constructor() {
        this.nombre = "";
        this.descripcion = "";
    }
}