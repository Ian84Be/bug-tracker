const router = require('express').Router();

const Tickets = require('./tickets-model.js');

// route /api/tickets
router.get('/', async (req, res) => {
	try {
		const allTickets = await Tickets.find();
		res.status(200).json(allTickets);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/:id', async (req, res) => {
	try {
		const thisTicket = await Tickets.findById(req.params.id);
		res.status(200).json(thisTicket);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.put('/:id', async (req, res) => {
	try {
		const updated = await Tickets.update(req.params.id, req.body);
		if (updated) {
			res.status(200).json(updated);
		} else {
			res
				.status(404)
				.json({ message: 'The Ticket with the specified ID does not exist.' });
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const removed = await Tickets.remove(req.params.id);
		if (removed) {
			res.status(204).json({ success: 'Ticket removed' });
		} else {
			res
				.status(404)
				.json({ message: 'The Ticket with the specified ID does not exist.' });
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
