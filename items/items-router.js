const express = require('express');
const router = express.Router();

const Items = require('../items/items-model.js');

router.post('/', validateItem, async (req, res) => {
	const item = req.body;

	const itemExist = await Items.findBy({ item }).first();

	if (itemExist) {
		res.status(400).json({ message: 'Item already exists!' });
		return;
	}

	Items.add(item)
		.then((item) => {
			res.status(201).json(item);
		})
		.catch((err) => res.status(500).json({ message: 'Database error: ', err }));
});

router.get('/', (req, res) => {
	Items.find(req.query)
		.then((item) => {
			res.status(200).json(item);
		})
		.catch((err) => {
			console.error(err);
			next(err);
		});
});

router.get('/:id', (req, res) => {
	
	Items.findById(req.params.id).then((item) => {
		if (item) {
			res.status(200).json({
				id: item.id,
				name: item.name,
				image_url: item.image_url,
				price: item.price,
				description: item.description,
				region: item.region,
				city: item.city,
				address: item.address,
				zip_code: item.zip_code,
				created_at: item.created_at,
				user_id: item.user_id,
				category_id: item.category_id,
			});
		} else {
			next({
				code: 500,
				message: 'There was an error fetching the item from the database',
			});
		}
	});
});

router.put('/:id', validateItem, (req, res) => {
	Items.update(req.body, req.params.id).then((item) => {
		if (item) {
			res.status(200).json({
				message: `Item ${req.params.id} has been changed successfully.`,
			});
		} else {
			next({
				code: 404,
				message: 'Could not find the item to apply the changes.',
			});
		}
	});
});

router.delete('/:id', validateItem, (req, res) => {
	Items.remove(req.params.id).then((item) => {
		if (item) {
			res.status(200).json({
				message: `Item ${req.params.id} has been deleted successfully.`,
			});
		} else {
			next({ code: 400, message: 'Item not found.' });
		}
	});
});

//custom middleware
function validateItem(req, res, next) {
	if (req.body && Object.keys(req.body).length > 0) {
		next();
	}
	if (!req.body) {
		next({ code: 400, message: 'missing item data' });
	}
	if (!req.body.text) {
		next({ code: 400, message: 'missing required text field' });
	}
}

module.exports = router;
