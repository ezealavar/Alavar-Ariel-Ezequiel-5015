const mongoose = require('mongoose');
const { Schema } = mongoose;
const categoriaEspectadorSchema = new Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
})
module.exports = mongoose.models.categoriaEspectador || mongoose.model('categoriaEspectador', categoriaEspectadorSchema);