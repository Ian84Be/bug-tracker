const router = require('express').Router();
const go = require('./crud');
const resource = 'team_list';

// route /api/teamlist
router.post('/', async (req, res) => {
	try {
		const [id] = await go.create(resource,req.body);
		if (id) {
			const newResource = await go.readById(resource, id);
			res.status(201).json(newResource);
		}
		else {
			res
				.status(400)
				.json({ error: 'failed to add team assignment' });
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/', async (req, res) => {
	try {
		const allResource = await go.readAll(resource);
		res.status(200).json(allResource);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/:id', async (req, res) => {
	try {
		const thisResource = await go.readById(resource,req.params.id);
		res.status(200).json(thisResource);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.put('/:id', async (req, res) => {
	try {
		const updated = await go.update(resource,req.params.id, req.body);
		if (updated) {
			const updatedResource = await go.readById(resource, req.params.id);
			res.status(200).json(updatedResource);
		}
		else {
			res
				.status(404)
				.json({ message: 'The team assignment with the specified ID does not exist.' });
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const removed = await go.delete(resource,req.params.id);
		if (removed) {
			res.status(200).json({ success: 'Team Assignment removed' });
		} else {
			res
				.status(404)
				.json({ message: 'The team assignment with the specified ID does not exist.' });
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
