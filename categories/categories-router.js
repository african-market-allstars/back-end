const express = require('express');
const router = express.Router();

const Categories = require('../categories/categories-model.js');

router.post('/', async (req, res) => {
	const category = req.body;

	const categoryExist = await Categories.findBy({ category }).first();

	if (categoryExist) {
		res.status(400).json({ message: 'category already exists, please log in!' });
		return;
	}

	Categories.add(category)
		.then((category) => {
			res.status(201).json(category);
		})
		.catch((err) => res.status(500).json({ message: 'Database error: ', err }));
});

router.get('/', (req, res) => {
	Categories.findBy(req.query)
		.then((category) => {
			res.status(200).json(category);
		})
		.catch((err) => {
			console.error(err);
			next(err);
		});
});

router.get('/:id', validateCategory, (req, res) => {
	Categories.findById(req.params.id).then((category) => {
		if (category) {
			res.status(201).json(category);
		} else {
			next({
				code: 500,
				message: 'There was an error fetching the category from the database',
			});
		}
	});
});

router.put('/:id', validateCategory, (req, res) => {
	Categories.update(req.body, req.params.id).then((category) => {
		if (category) {
			res.status(200).json({
				message: `category ${req.params.id} has been changed successfully.`,
			});
		} else {
			next({
				code: 404,
				message: 'Could not find the category to apply the changes.',
			});
		}
	});
});

router.delete('/:id', validateCategory, (req, res) => {
	Categories.remove(req.params.id).then((category) => {
		if (category) {
			res.status(200).json({
				message: `category ${req.params.id} has been deleted successfully.`,
			});
		} else {
			next({ code: 400, message: 'category not found.' });
		}
	});
});


//custom middleware
function validateCategory (req, res, next) {
	if (req.body && Object.keys(req.body).length > 0) {
		next();
	}
	if (!req.body) {
		next({ code: 400, message: 'missing category data' });
	}
	if (!req.body.text) {
		next({ code: 400, message: 'missing required text field' });
	}
}

module.exports = router;
