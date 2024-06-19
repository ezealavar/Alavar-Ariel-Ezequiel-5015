import { Categoria } from "./categoria";
import { Espectador } from "./espectador";

export class Ticket {
    _id!: number;
    precioReal!: number;
    precioCobrado!: number;
    categoriaEspectador!: string;
    fechaCobro!: string;
    espectador!: Espectador;
    categoria: Categoria;

    constructor() {
        this.precioReal = 0;
        this.precioCobrado = 0;
        this.categoriaEspectador = '';
        this.fechaCobro = Date();
        this.categoria = new Categoria();
    }
}