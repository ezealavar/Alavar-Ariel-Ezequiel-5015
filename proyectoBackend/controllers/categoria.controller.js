const Categoria = require('../models/categoriaEspectador');

const categoriaCtrl = {}

categoriaCtrl.getCategorias = async (req, res) => {
    var categorias = await Categoria.find();
    res.status(200).json(categorias);
}

categoriaCtrl.createCategoria = async (req, res) => {
    var categoria = new Categoria(req.body);
    try {
        await categoria.save();
        res.json({
            'status': '1',
            'msg': 'Categoria guardada.'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}

module.exports = categoriaCtrl;