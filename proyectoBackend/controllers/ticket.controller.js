const Ticket = require('../models/ticket');
const Categoria = require('../models/categoriaEspectador');

const ticketCtrl = {}

ticketCtrl.getTickets = async (req, res) => {
    var tickets = await Ticket.find().populate("categoria").populate("espectador");
    res.status(200).json(tickets);
}

ticketCtrl.getTicket = async (req, res) => {
    var ticket = await Ticket.findById(req.params.id);
    res.status(200).json(ticket);
}

ticketCtrl.getTicketsPorCategoria = async (req, res) => {
    // var tickets = await Ticket.find({ categoriaEspectador: req.params.categoriaEspectador }).populate("espectador");
    var tickets = await Ticket.find({ categoria: categoria._id }).populate("espectador").populate("categoria");


    res.status(200).json(tickets);
}


ticketCtrl.getTicketsPorCategoriaNuevo = async (req, res) => {
    var tickets = await Ticket.find({ 'categoria.nombre': req.params.categoria }).populate("espectador").populate("categoria");

    res.status(200).json(tickets);
}



ticketCtrl.createTicket = async (req, res) => {
    var ticket = new Ticket(req.body);
    try {
        await ticket.save();
        res.json({
            'status': '1',
            'msg': 'Ticket guardado.'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}

ticketCtrl.editTicket = async (req, res) => {
    const vticket = new Ticket(req.body);
    try {
        await Ticket.updateOne({ _id: req.body._id }, vticket);
        res.json({
            'status': '1',
            'msg': 'Ticket updated'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}
ticketCtrl.deleteTicket = async (req, res) => {
    try {
        await Ticket.deleteOne({ _id: req.params.id });
        res.json({
            status: '1',
            msg: 'Ticket removed'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

module.exports = ticketCtrl;
