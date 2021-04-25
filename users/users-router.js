const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const { isValid } = require('../users/users-service.js');

const Users = require('../users/users-model.js');
const Items = require('../items/items-model.js');

const restrictedMiddleware = require('../auth/restricted-middleware.js');

router.post('/:id/items', restrictedMiddleware, async (req, res) => {
	const item = req.body;

	item.user_id = req.params.id;

	try {
		const newItem = await Items.add(item);
		res.status(201).json(newItem);
	} catch (err) {
		res.status(500).json({ message: 'Database error' });
		console.log(err);
	}
});

router.put('/:id', restrictedMiddleware, async (req, res, next) => {
	const user = req.body;

	user.id = req.params.id;

	const rounds = process.env.BCRYPT_ROUNDS ? parseInt(process.env.BCRYPT_ROUNDS) : 10;

	const hash = await bcrypt.hashSync(user.password, rounds);
	user.password = hash;

	try {
		if (isValid(user)) {
			const updatedUser = await Users.update(user, user.id);
			res.status(201).json(updatedUser);
		} else {
			next({
				apiCode: 400,
				apiMessage: 'name, email or password missing',
			});
		}
	} catch (error) {
		next({ apiCode: 500, apiMessage: 'error saving new user', ...error });
	}
});


router.get('/:id', restrictedMiddleware, async (req, res, next) => {
	Users.findById(req.params.id)
		.then((resource) => {
			if (resource) {
				res.status(200).json(resource);
			} else {
				res.status(404).json({ message: 'user not found' });
			}
		})
		.catch((err) => {
			next({ apiCode: 500, apiMessage: 'error saving new user', ...err });
		});
});

router.get('/:id/items', restrictedMiddleware, (req, res) => {
	const { id } = req.params;

	Items.findById(id)
		.then((items) => {
			if (items) {
				res.status(200).json(items);
			} else {
				res.status(404).json({ message: 'Could not find Items for given User.' });
			}
		})
		.catch((err) => {
			res.status(500).json({ message: 'Failed to get Items.' });
			console.log(err);
		});
});

router.put('/:id/items/:item_id', restrictedMiddleware, async (req, res, next) => {
	const { item_id } = req.params;
	const changes = req.body;

	const item = Items.findById(item_id);

	try {
		if (item) {
			await Items.update(changes, item_id);

			const updatedItem = await Items.findById(req.params.id).first();

			console.log(updatedItem);

			res.status(200).json({
				updatedItem,
				message: 'Item updated',
			});
		}
	} catch (err) {
		next({ apiCode: 500, apiMessage: 'failed to update Item.' });
	}
});

router.delete('/:id', restrictedMiddleware, (req, res, next) => {
	const { id } = req.params;

	Users.remove(id)
		.then((deleted) => {
			if (deleted) {
				res.json({ removed: deleted });
			} else {
				res.status(404).json({ message: `Could not find user with given id: ${id}` });
			}
		})
		.catch((err) => {
			next({ apiCode: 500, apiMessage: 'failed to update Item.', ...err });
		});
});

router.delete('/:id/items/:item_id', restrictedMiddleware, async (req, res, next) => {
	const { item_id } = req.params;

	const item = Items.findById(item_id);

	try {
		if (item) {
			await Items.remove(item_id);
			const deleteItem = await Items.findById(req.params.id);

			res.status(200).json({
				deleteItem,
				message: 'item deleted',
			});
		}
	} catch (err) {
		next({ apiCode: 500, apiMessage: 'failed to delete item', ...err });
	}
});

module.exports = router;
