const espectadorCtrl = require('./../controllers/espectador.controller');

const express = require('express');
const router = express.Router();

router.get('/', espectadorCtrl.getEspectadores);
router.get('/:id', espectadorCtrl.getEspectador);
router.post('/', espectadorCtrl.createEspectador);

module.exports = router;
