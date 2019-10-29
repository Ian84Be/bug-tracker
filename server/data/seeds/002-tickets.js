exports.seed = function(knex) {
  return knex('tickets').insert([
		{
				date: '1572233449824',
				from: '1',
				project: 'This',
				subject: 'BIG TROUBLE',
				content: 'trouble with the the thing!',
				status: 'new',
				priority: 'high'
		},
		{
			date: '1572233451021',
			from: '1',
			project: 'This',
			subject: 'edge case - AppBar component',
			content: 'other thing dont work',
			status: 'inProgress',
			priority: 'low'
	},
	{
		date: '1572233451029',
		from: '1',
		project: 'This',
		subject: 'user data broken',
		content: 'that thing dont work',
		status: 'fixed',
		priority: 'high'
}
	])
};