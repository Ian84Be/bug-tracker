exports.seed = function(knex) {
  return knex('assignments').insert([
		{
				user_id: 2,
				ticket_id: 1,
		},
		{
				user_id: 3,
				ticket_id: 2,
		},
		{
				user_id: 4,
				ticket_id: 2,
		}
	])
};