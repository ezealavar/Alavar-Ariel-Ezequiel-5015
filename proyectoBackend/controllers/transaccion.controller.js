const Transaccion = require('../models/transaccion');

const transaccionCtrl = {}

transaccionCtrl.getTransacciones = async (req, res) => {
    var transacciones = await Transaccion.find();
    res.status(200).json(transacciones);
}

transaccionCtrl.createTransaccion = async (req, res) => {
    var transaccion = new Transaccion(req.body);
    // transaccion.cantidadDestino = transaccion.cantidadOrigen * transaccion.tasaConversion;

    try {
        await transaccion.save();
        res.status(200).json({ 
            'status': '1', 
            'msg': 'Transaccion Guardada.' 
        })
    } catch (error) {
        res.status(500).json({ 
            'status': '0', 
            'msg': 'Error procesando la operacion'
    })
    }
}

transaccionCtrl.getTransaccionesPorEmail = async (req, res) => {
    const transaccion = await Transaccion.find({ emailCliente: req.params.emailCliente });
    res.status(200).json(transaccion);
}

transaccionCtrl.getTransaccionesPorDivisas = async (req, res) => {
    const transaccion = await Transaccion.find({ 
        monedaOrigen: req.query.monedaOrigen, 
        monedaDestino: req.query.monedaDestino
    });
    res.status(200).json(transaccion);
}

module.exports = transaccionCtrl;