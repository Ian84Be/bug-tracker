const router = require('express').Router();

const Users = require('./users-model.js');

// route /api/users
router.get('/', async (req, res) => {
	try {
		const allUsers = await Users.find();
		res.status(200).json(allUsers);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/:id', async (req, res) => {
	try {
		const thisUser = await Users.findById(req.params.id);
		res.status(200).json(thisUser);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.put('/:id', async (req, res) => {
	try {
		const updated = await Users.update(req.params.id, req.body);
		if (updated) {
			res.status(200).json(updated);
		} else {
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
		const removed = await Users.remove(req.params.id);
		if (removed) {
			res.status(204).json({ success: 'User removed' });
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
