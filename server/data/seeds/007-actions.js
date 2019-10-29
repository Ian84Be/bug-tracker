exports.seed = function(knex) {
  return knex('actions').insert([
		{
				user_id: 2,
				ticket_id: 1,
				date: '2019-11-27T05:20:00.579Z',
				content: 'fixed the thing!'
		},
		{
				user_id: 3,
				ticket_id: 2,
				date: '2019-12-27T05:20:00.579Z',
				content: 'fixed the thing!'
		},
		{
				user_id: 4,
				ticket_id: 2,
				date: '2019-12-22T05:20:00.579Z',
				content: 'fixed the thing!'
		}
	])
};