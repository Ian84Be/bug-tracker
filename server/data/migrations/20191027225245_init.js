
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
	.createTable('tickets', tbl => {
			tbl.increments();
			tbl.string('date').notNullable();
			tbl.string('from')
				.references('id')
				.inTable('users')
				.notNullable();
			tbl.string('project');
			tbl.string('subject').notNullable();
			tbl.text('content').notNullable();
			tbl.text('status')
				.notNullable()
				.defaultTo('new');
			tbl.text('priority');
	})
};

exports.down = function(knex) {
  return knex.schema
        .dropTableIfExists('tickets')
        .dropTableIfExists('users');
};
