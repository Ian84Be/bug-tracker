exports.seed = function(knex) {
  return knex('projects').insert([
		{
				name: 'pizzahut loyalty'
		},
		{
				name: 'bestbuy geeksquad'
		},
		{
				name: 'clearchannel programming'
		},
	])
};