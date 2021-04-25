const db = require('../data/dbConfig.js');

module.exports = {
	add,
	addItem,
	find,
	findBy,
	findById,
	update,
	remove,
};

async function add(user) {
	const [id] = await db('users').insert(user, 'id');
	return db('users').where({ id }).first();
}

function addItem(item, user_id) {
	return db('items').insert({ ...item, user_id });
}

function find() {
	return db('users');
}

function findBy(filter) {
	return db('users').where(filter);
}

function findById(id) {
	return db('users').where({ id }).select('id', 'username', 'email', 'country', 'user_image_url').first();
}

function update(changes, id) {
	return db('users').where({ id }).update(changes);
}

function remove(id) {
	return db('users').where({ id }).del();
}