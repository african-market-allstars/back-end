exports.up = function (knex) {
	return knex.schema
		.createTable('users', (tbl) => {
			tbl.increments('id');
			tbl.string('username', 128).notNullable().unique();
			tbl.string('email', 128).notNullable().unique();
			tbl.string('password', 256).notNullable();
			tbl.string('country', 128);
			tbl.string('user_image_url', 256);
		})
		.createTable('categories', (tbl) => {
			tbl.increments('id');
			tbl.string('category_name', 128).notNullable().unique();
		})
		.createTable('items', (tbl) => {
			tbl.increments('id');
			tbl.string('name', 128).notNullable().unique();
			tbl.string('image_url', 128);
			tbl.float('price', 128).notNullable();
			tbl.string('description', 256).notNullable();
			tbl.string('region', 128);
			tbl.string('city', 128);
			tbl.string('address', 256);
			tbl.string('zip_code', 128);
			tbl.timestamp('created_at').defaultTo(knex.fn.now());
			tbl.integer('user_id')
				.unsigned()
				.notNullable()
				.references('users.id')
				.onUpdate('CASCADE')
				.onDelete('CASCADE');
			tbl.integer('category_id')
				.unsigned()
				.notNullable()
				.references('categories.id')
				.onUpdate('CASCADE')
				.onDelete('CASCADE');
		});
};

exports.down = function (knex) {
	return knex.schema.dropTableIfExists('items').dropTableIfExists('categories').dropTableIfExists('users');
};