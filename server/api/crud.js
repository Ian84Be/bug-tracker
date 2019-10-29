const db = require('../data/dbConfig');

exports.create = (table, object) => {
	return db(table).insert(object);
}

exports.readAll = (table) => {
	return db(table);
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