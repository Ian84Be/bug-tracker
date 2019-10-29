const db = require('../data/dbConfig');

module.exports = {
	add,
	remove,
	find,
	findBy,
	findById,
	update
};

async function add(ticket) {
	let [id] = await db('tickets').insert(ticket).returning('id');
	return db('tickets')
		.select('*')
		.where({ id })
		.first();
}

async function remove(id) {
	return db('tickets').where({id}).delete();
}

async function find() {
	return db('tickets').select('*');
}

async function findBy(filter) {
	return db.select('*').from('tickets').where(filter).first();
}

async function findById(id) {
	return db('tickets').select('id','ticketname').where({id}).first();
}

async function update(id, payload) {
    await db('tickets').where({id}).update(payload);
    return findById(id);
}
