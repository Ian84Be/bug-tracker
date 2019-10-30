const request = require('supertest');
const server = require('../api/server');
const db = require('../data/dbConfig');

beforeAll(async (done) => {
	await db('team_list').delete();
	await db('teams').delete();
	await db('tickets').delete();
	await db('projects').delete();
	await db('users').delete();
	done();
});

afterAll(async (done) => {
	await db('team_list').delete();
	await db('teams').delete();
	await db('tickets').delete();
	await db('projects').delete();
	await db('users').delete();
	done();
});

const endpoint = '/api/teamlist';
describe('teamList-router.js', () => {
	it('should start with an empty table', () => {
		return request(server).get(endpoint).then(res => {
			expect(res.status).toBe(200);
			expect(res.body.length).toBe(0);
		})
	});

	describe('setup resource dependencies', () => {
		it('should create a new user named steve', (done) => {
			const newUser = {
				"id":1,
				"username": "steve",
				"password": "dave",
				"email": "e@m",
				"role": "user"
			};
			return request(server).post('/api/users')
				.send(newUser)
				.set('Content-Type', 'application/json')
				.set('Accept', 'application/json')
				.then(res => {
				expect(res.status).toBe(201);
				expect(res.body.username).toBe('steve');
				done();
			})
		});

		it('should create a new team named Rocket ', (done) => {
			const newResource = {
				"id":1,
				"name": "Rocket",
				"desc": "pokemans team"
			};
			return request(server).post('/api/teams')
				.send(newResource)
				.set('Content-Type', 'application/json')
				.set('Accept', 'application/json')
				.then(res => {
					expect(res.status).toBe(201);
					expect(res.body.name).toBe('Rocket');
					done();
			})
		})
	})

	describe('perform crud actions', () => {
		it('should assign steve to team Rocket as Team Lead', (done) => {
			const newResource = {
				"id" : 1,
				"user_id" : 1,
				"team_id" : 1,
				"role":"Team Lead"
			};
			return request(server).post(endpoint)
				.send(newResource)
				.set('Content-Type', 'application/json')
				.set('Accept', 'application/json')
				.then(res => {
					expect(res.status).toBe(201);
					expect(res.body.role).toBe("Team Lead");
					done();
			})
		})
	
		it('should return the resource by id (1)', () => {
			return request(server).get(`${endpoint}/1`).then(res => {
				expect(res.status).toBe(200);
				expect(res.body.role).toBe("Team Lead");
			})
		});
	
		it('should update steves role to Project Lead', (done) => {
			return request(server).put(`${endpoint}/1`)
			.send({'role':'Project Lead'})
				.set('Content-Type', 'application/json')
				.set('Accept', 'application/json')
				.then(res => {
					expect(res.status).toBe(200);
					expect(res.body.role).toBe('Project Lead');
					done();
			})
		});
	
		it('should delete team Pikachu by id (1)', (done) => {
			return request(server).delete(`${endpoint}/1`).then(res => {
				expect(res.status).toBe(200);
				expect(res.body.success).toBe('Team Assignment removed');
				done();
			})
		});

		it('should end with an empty table', () => {
			return request(server).get(endpoint).then(res => {
				expect(res.status).toBe(200);
				expect(res.body.length).toBe(0);
			})
		});
	})
})