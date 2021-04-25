const db = require('../data/dbConfig.js');

module.exports = {
	add,
	find,
	findBy,
	findById,
	update,
	remove,
};

async function add(item) {
	const [id] = await db('items').insert(item, 'id');
	return db('items').where({ id }).first();
}

function find() {
	return db('items').join('users', 'items.user_id', '=', 'user_id');
}

function findBy(filter) {
	return db('users').where(filter);
}

function findById(id) {
	return db('items')
		.join('users', 'items.user_id', '=', 'users.id')
		.join('categories', 'items.category_id', '=', 'categories.id')
		.where('items.user_id', id)
		.select(
			'items.id as id',
			'name',
			'image_url',
			'price',
			'description',
			'region',
			'city',
			'address',
			'zip_code',
			'created_at',
			'user_id',
			'category_id'
		);
}

function update(changes, id) {
	return db('items').where({ id }).update(changes);
}

function remove(id) {
	return db('items').where({ id }).del();
}
