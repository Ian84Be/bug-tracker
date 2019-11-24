const router = require('express').Router();
const go = require('./crud');

// route /api/tickets
router.post('/', async (req, res) => {
	try {
		const [id] = await go.create('tickets',req.body);
		if (id) {
			const newResource = await go.readById('tickets', id);
			res.status(201).json(newResource);
		}
		else {
			res
				.status(400)
				.json({ error: 'failed to add ticket' });
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/', async (req, res) => {
	try {
		const allTickets = await go.readAllTickets();
		res.status(200).json(allTickets);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/:id', async (req, res) => {
	try {
		const thisTicket = await go.readById('tickets',req.params.id);
		res.status(200).json(thisTicket);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.put('/:id', async (req, res) => {
	try {
		const updated = await go.update('tickets',req.params.id, req.body);
		if (updated) {
			const updatedResource = await go.readById('tickets', req.params.id);
			res.status(200).json(updatedResource);
		}
		else {
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
		const removed = await go.delete('tickets',req.params.id);
		if (removed) {
			res.status(200).json({ success: 'Ticket removed' });
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
