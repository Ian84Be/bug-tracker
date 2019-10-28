exports.seed = function(knex) {
  return knex('bugs').insert([
		{
				date: '1572233449824',
				from: '1',
				project: 'This',
				subject: 'mySubject',
				desc: 'shit dont work',
				status: 'new',
				priority: 'high'
		},
		{
			date: '1572233451021',
			from: '1',
			project: 'This',
			subject: 'mySubject',
			desc: 'other shit dont work',
			status: 'inProgress',
			priority: 'low'
	},
	{
		date: '1572233451029',
		from: '1',
		project: 'This',
		subject: 'mySubject',
		desc: 'that stuff dont work',
		status: 'fixed',
		priority: 'high'
}
	])
};