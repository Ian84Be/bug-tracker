exports.seed = function(knex) {
  return knex('users').insert([
		{
				username: 'admin',
				password: 'admin',
				role:'admin'
		},
		{
				username: 'julien',
				password: 'julien',
				role:'team_lead'
		},
		{
				username: 'mr-lahey',
				password: 'mr-lahey',
				role:'team_lead'
		},
		{
				username: 'ricky',
				password: 'ricky',
				role:'user'
		},
		{
				username: 'trevor',
				password: 'trevor',
				role:'user'
		},
		{
				username: 'cory',
				password: 'cory',
				role:'user'
		}
	])
};