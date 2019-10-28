
exports.up = function(knex) {
	return knex.schema
	.createTable('users', tbl => {
			tbl.increments();
			tbl.string('username', 128)
					.notNullable()
					.unique();
			tbl.string('password').notNullable();
			tbl.string('email');
	})
	.createTable('bugs', tbl => {
			tbl.increments();
			tbl.string('date').notNullable();
			tbl.string('from')
				.references('id')
				.inTable('users')
				.notNullable();
			tbl.string('project').notNullable();
			tbl.string('subject').notNullable();
			tbl.text('desc').notNullable();
			tbl.text('status')
				.notNullable()
				.defaultTo('new');
			tbl.text('priority');
	})
};

exports.down = function(knex) {
  
};
