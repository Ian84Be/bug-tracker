const db = require('../data/dbConfig');

exports.create = (table, object) => {
	return db(table).insert(object).returning('id');
}

exports.readAll = (table) => {
	return db(table);
}

exports.readAllTickets = () => {
	return db
		.select(
			't.id',
			't.content',
			't.date_created', 
			't.date_updated', 
			't.priority', 
			't.status', 
			't.subject', 
			'p.name as project',
			'u.username as from_user'
			)
		.from('tickets as t')
		.join('projects as p', 'p.id', 't.project_id')
		.join('users as u', 'u.id', 't.from_user_id')
		.orderBy('t.date_created', 'desc');
}

exports.readById = (table, id, ...columns) => {
	return db(table)
		.select(columns ? columns : '*')
		.where({id})
		.first();
}

exports.update = (table, id, object) => {
	return db(table)
		.update(object)
		.where({id});
}

exports.delete = (table, id) => {
	return db(table)
		.del()
		.where({id});
}