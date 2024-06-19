const transaccionCtrl = require('../controllers/transaccion.controller');

const express = require('express');
const router = express.Router();

router.get('/divisas', transaccionCtrl.getTransaccionesPorDivisas);
router.get('/:emailCliente', transaccionCtrl.getTransaccionesPorEmail);
router.get('/', transaccionCtrl.getTransacciones);
router.post('/', transaccionCtrl.createTransaccion);

module.exports = router;