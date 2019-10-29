const router = require('express').Router();
const go = require('./crud');

// route /api/users
router.post('/', async (req, res) => {
	try {
		const [id] = await go.create('users',req.body);
		if (id) {
			const newResource = await go.readById('users', id);
			res.status(201).json(newResource);
		}
		else {
			res
				.status(400)
				.json({ error: 'failed to add user' });
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/', async (req, res) => {
	try {
		const allUsers = await go.readAll('users');
		res.status(200).json(allUsers);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/:id', async (req, res) => {
	try {
		const thisUser = await go.readById('users',req.params.id);
		res.status(200).json(thisUser);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.put('/:id', async (req, res) => {
	try {
		const updated = await go.update('users',req.params.id, req.body);
		if (updated) {
			const updatedResource = await go.readById('users', req.params.id);
			res.status(200).json(updatedResource);
		}
		else {
			res
				.status(404)
				.json({ message: 'The User with the specified ID does not exist.' });
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const removed = await go.delete('users',req.params.id);
		if (removed) {
			res.status(200).json({ success: 'User removed' });
		} else {
			res
				.status(404)
				.json({ message: 'The User with the specified ID does not exist.' });
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
