exports.seed = function(knex) {
  return knex('tickets').insert([
		{
				date: '2019-10-27T05:20:00.579Z',
				from: '1',
				project: 'This',
				subject: 'BIG TROUBLE',
				content: 'trouble with the the thing!',
				status: 'new',
				priority: 'high'
		},
		{
			date: '2019-09-29T08:52:46.579Z',
			from: '1',
			project: 'This',
			subject: 'edge case - AppBar component',
			content: 'other thing dont work',
			status: 'inProgress',
			priority: 'low'
	},
	{
		date: '2019-10-28T04:21:46.579Z',
		from: '1',
		project: 'This',
		subject: 'user data broken',
		content: 'that thing dont work',
		status: 'fixed',
		priority: 'high'
}
	])
};