const mongoose = require('mongoose');
const { Schema } = mongoose;
const Espectador = require ('./espectador');
const CategoriaEspectador = require ('./categoriaEspectador');

const TicketSchema = new Schema({
    precioReal: { type: Number, required: true },
    precioCobrado: { type: Number, required: true },
    categoriaEspectador: { type: String, required: true },
    fechaCobro: { type: String, required: true },
    espectador: { type: Schema.Types.ObjectId, ref: Espectador, required: true },
    categoria: { type: Schema.Types.ObjectId, ref: CategoriaEspectador, required: true },
})
module.exports = mongoose.models.Ticket || mongoose.model('Ticket', TicketSchema);
