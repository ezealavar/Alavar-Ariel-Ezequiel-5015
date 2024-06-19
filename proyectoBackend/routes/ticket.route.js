const ticketCtrl = require('./../controllers/ticket.controller');

const express = require('express');
const router = express.Router();

router.post('/', ticketCtrl.createTicket);
router.get('/', ticketCtrl.getTickets);
router.get('/:id', ticketCtrl.getTicket);
router.get('/categoriaEspectador/:categoriaEspectador', ticketCtrl.getTicketsPorCategoria);
router.get('/categoriaEspectador/parcial/:categoria', ticketCtrl.getTicketsPorCategoriaNuevo);
router.put('/:id', ticketCtrl.editTicket);
router.delete('/:id', ticketCtrl.deleteTicket);

module.exports = router;
