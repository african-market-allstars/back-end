const pgConnection = process.env.DATABASE_URL || 'postgresql://postgres@localhost/users';

module.exports = {
	development: {
		client: 'sqlite3',
		useNullAsDefault: true,
		connection: {
			filename: './data/african.db3',
		},
		pool: {
			afterCreate: (conn, done) => {
				conn.run('PRAGMA foreign_keys = 0', done);
			},
		},
		migrations: {
			directory: './data/migrations',
		},
		seeds: {
			directory: './data/seeds',
		},
	},

	testing: {
		client: 'sqlite3',
		useNullAsDefault: true,
		connection: {
			filename: './data/african-test.db3',
		},
		migrations: {
			directory: './data/migrations',
		},
		seeds: {
			directory: './data/seeds',
		},
	},

	production: {
		client: 'pg',
		useNullAsDefault: true,
		connection: pgConnection,
		migrations: {
			directory: './data/migrations',
		},
		seeds: {
			directory: './data/seeds',
		},
		pool: {
			min: 2,
			max: 10,
		},
	},
};