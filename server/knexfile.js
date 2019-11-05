const localPg = {
	host: 'localhost',
	database: 'trouble_ticket_testing2',
	user: 'test',
	password: 'test'
};

const productionDbConnection = process.env.DATABASE_URL || localPg;

module.exports = {
	development: {
		client: 'sqlite3',
		connection: {
			filename: './data/trouble-ticket-2020.sqlite3'
		},
		useNullAsDefault: true,
		migrations: {
			directory: './data/migrations'
		},
		seeds: {
			directory: './data/seeds'
		}
	},
	testing: {
		client: 'pg',
		connection: localPg,
		useNullAsDefault: true,
		migrations: {
			directory: './data/migrations'
		},
		pool: {
      min: 2,
      max: 10
    },
		seeds: {
			directory: './data/seeds'
		}
	},

	production: {
		client: 'pg',
		connection: productionDbConnection,
		migrations: {
			directory: './data/migrations',
		  },
		  seeds: {
			directory: './data/seeds',
		},
	}
};
