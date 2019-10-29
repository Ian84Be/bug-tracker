exports.seed = function(knex) {
  return knex('teams').insert([
		{
				name: 'frontend',
				desc: 'frontend UX/UI engineers'
		},
		{
				name: 'backend',
				desc: 'backend APIs / DBAs'
		},
		{
				name: 'data science',
				desc: 'big data analytics'
		},
		{
				name: 'user experience',
				desc: 'product design & user research'
		},
	])
};