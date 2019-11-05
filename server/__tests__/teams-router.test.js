const request = require('supertest');
const server = require('../api/server');
const db = require('../data/dbConfig');

beforeAll(async (done) => {
	await db('teams').delete();
	done()
});

afterAll(async (done) => {
	await db('teams').delete();
	done()
});

const endpoint = '/api/teams';
describe('teams-router.js', () => {
	it('should start with an empty table', () => {
		return request(server).get(endpoint).then(res => {
			expect(res.status).toBe(200);
			expect(res.body.length).toBe(0);
		})
	});

	it('should create a new team named Rocket ', () => {
		const newResource = {
			"id":1,
			"name": "Rocket",
			"desc": "pokemans team"
		};
		return request(server).post(endpoint)
			.send(newResource)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.then(res => {
			expect(res.status).toBe(201);
			expect(res.body.name).toBe('Rocket');
		})
	});

	it('should return team Rocket by id (1)', () => {
		return request(server).get(`${endpoint}/1`).then(res => {
			expect(res.status).toBe(200);
			expect(res.body.name).toBe('Rocket');
		})
	});

	it('should update team Rocket to Pikachu', () => {
		return request(server).put(`${endpoint}/1`)
		.send({'name':'Pikachu'})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.then(res => {
			expect(res.status).toBe(200);
			expect(res.body.name).toBe('Pikachu');
		})
	});

	it('should delete team Pikachu by id (1)', () => {
		return request(server).delete(`${endpoint}/1`).then(res => {
			expect(res.status).toBe(200);
			expect(res.body.success).toBe('Team removed');
		})
	});

	it('should end with an empty table', () => {
		return request(server).get(endpoint).then(res => {
			expect(res.status).toBe(200);
			expect(res.body.length).toBe(0);
		})
	});
})