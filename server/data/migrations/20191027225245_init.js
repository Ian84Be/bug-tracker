
exports.up = function(knex) {
	return knex.schema
	.createTable('users', tbl => {
			tbl.increments();
			tbl.string('username', 128)
					.notNullable()
					.unique();
			tbl.string('password').notNullable();
			tbl.string('email');
			tbl.string('role');
	})
	.createTable('projects', tbl => {
		tbl.increments();
		tbl.string('name').notNullable().unique();
	})
	.createTable('teams', tbl => {
		tbl.increments();
		tbl.string('name').notNullable().unique();
		tbl.string('desc');
	})
	.createTable('team_list', tbl => {
		tbl.increments();
		tbl.integer('user_id')
				.references('id')
				.inTable('users')
				.onDelete('CASCADE')
				.onUpdate('CASCADE')
				.notNullable();
		tbl.integer('team_id')
				.references('id')
				.inTable('teams')
				.onDelete('CASCADE')
				.onUpdate('CASCADE')
				.notNullable();
		tbl.string('role');
	})
	.createTable('tickets', tbl => {
			tbl.increments();
			tbl.string('date_created').notNullable();
			tbl.string('date_updated').notNullable();
			tbl.integer('from_user_id')
				.references('id')
				.inTable('users')
				.onDelete('RESTRICT')
				.onUpdate('CASCADE')
				.notNullable();
			tbl.integer('project_id')
				.references('id')
				.inTable('projects')
				.onDelete('RESTRICT')
				.onUpdate('CASCADE')
				.notNullable();
			tbl.string('subject').notNullable();
			tbl.text('content').notNullable();
			tbl.string('status')
				.notNullable()
				.defaultTo('new');
			tbl.string('priority');
	})
	.createTable('assignments', tbl => {
		tbl.increments();
		tbl.integer('user_id')
			.references('id')
			.inTable('users')
			.onDelete('CASCADE')
			.onUpdate('CASCADE')
			.notNullable();
		tbl.integer('ticket_id')
			.references('id')
			.inTable('tickets')
			.onDelete('CASCADE')
			.onUpdate('CASCADE')
			.notNullable();
	})
	.createTable('actions', tbl => {
		tbl.increments();
		tbl.integer('ticket_id')
			.references('id')
			.inTable('tickets')
			.onDelete('CASCADE')
			.onUpdate('CASCADE')
			.notNullable();
		tbl.integer('user_id')
			.references('id')
			.inTable('users')
			.onDelete('RESTRICT')
			.onUpdate('CASCADE')
			.notNullable();
		tbl.string('date').notNullable();
		tbl.text('content').notNullable();
	})
	
	
};

exports.down = function(knex) {
  return knex.schema
        .dropTableIfExists('actions')
        .dropTableIfExists('assignments')
        .dropTableIfExists('tickets')
        .dropTableIfExists('team_list')
        .dropTableIfExists('teams')
        .dropTableIfExists('projects')
        .dropTableIfExists('users');
};
