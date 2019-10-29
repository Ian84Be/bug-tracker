exports.seed = function(knex) {
  return knex('team_list').insert([
		{
				user_id: 2,
				team_id: 2,
				role: 'Team Lead'
		},
		{
				user_id: 3,
				team_id: 2,
				role: 'Dev 1'
		},
		{
				user_id: 4,
				team_id: 2,
				role: 'Dev 2'
		},

	])
};