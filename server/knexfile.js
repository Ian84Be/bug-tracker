const localPg = {
	host: 'localhost',
	database: 'trouble_ticket',
	user: 'dev',
	password: 'dev'
};

const testPg = {
	host: 'localhost',
	database: 'trouble_ticket_testing',
	user: 'tester',
	password: 'tester'
};

const productionDbConnection = process.env.DATABASE_URL || localPg;

module.exports = {
	development: {
		client: 'pg',
		connection: localPg,
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
		connection: testPg,
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
