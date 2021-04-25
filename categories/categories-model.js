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
	const [id] = await db('categories').insert(item, 'id');
	await db('categories').where({ id }).first();
}

function find() {
	return db('categories').join('users', 'categories.user_id', '=', 'user_id');
}

function findBy(filter) {
	return db('users').where(filter);
}

function findById(id) {
	return db('categories').where({ id });
	// .join('users', 'categories.user_id', '=', 'user_id')
	// .where('categories.user_id', id)
	// .select(
	// 	'categories.id as item_id',
	// 	'item_name',
	// 	'item_image_url',
	// 	'item_price',
	// 	'item_description',
	// 	'item_country',
	// 	'item_city',
	// 	'item_address',
	// 	'item_zip_code'
	// );
}

function update(changes, id) {
	return db('categories').where({ id }).update(changes);
}

function remove(id) {
	return db('categories').where({ id }).del();
}