export class Transaccion {
    _id!: string;
    monedaOrigen: string;
    cantidadOrigen!: number;
    monedaDestino: string;
    cantidadDestino: number;
    emailCliente: string;
    tasaConversion!: number;

    constructor() {
        this.monedaOrigen = 'USD';
        this.monedaDestino = 'ARS';
        this.cantidadDestino = 0;
        this.emailCliente = '';
    }
}