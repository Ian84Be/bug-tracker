exports.seed = function(knex) {
  return knex('tickets').insert([
		{
			date_created: '2019-10-27T05:20:00.579Z',
			date_updated: '2019-10-27T05:20:00.579Z',
			from_user_id: 2,
			project_id: 1,
			subject: 'BIG TROUBLE',
			content: 'trouble with the the thing!',
			status: 'new',
			priority: 'high'
		},
		{
			date_created: '2019-09-29T08:52:46.579Z',
			date_updated: '2019-10-27T05:20:00.579Z',
			from_user_id: 1,
			project_id: 1,
			subject: 'edge case - AppBar component',
			content: 'other thing dont work',
			status: 'inProgress',
			priority: 'low'
	},
	{
			date_created: '2019-10-28T04:21:46.579Z',
			date_updated: '2019-10-27T05:20:00.579Z',
			from_user_id: 2,
			project_id: 2,
			subject: 'user data broken',
			content: 'that thing dont work',
			status: 'fixed',
			priority: 'high'
	}
	])
};