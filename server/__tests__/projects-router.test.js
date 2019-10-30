const request = require('supertest');
const server = require('../api/server');
const db = require('../data/dbConfig');

beforeAll(async (done) => {
	await db('projects').delete();
	await db('users').delete();
	done()
});

afterAll(async (done) => {
	await db('projects').delete();
	await db('users').delete();
	done()
});

const endpoint = '/api/projects';
describe('projects-router.js', () => {
	it('should start with an empty table', () => {
		return request(server).get(endpoint).then(res => {
			expect(res.status).toBe(200);
			expect(res.body.length).toBe(0);
		})
	});

	it('should create a new project named FizzBuzz ', (done) => {
		const newResource = {
			"id":1,
			"name": "FizzBuzz"
		};
		return request(server).post(endpoint)
			.send(newResource)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.then(res => {
			expect(res.status).toBe(201);
			expect(res.body.name).toBe('FizzBuzz');
			done();
		})
	});

	it('should return FizzBuzz by id (1)', () => {
		return request(server).get(`${endpoint}/1`).then(res => {
			expect(res.status).toBe(200);
			expect(res.body.name).toBe('FizzBuzz');
		})
	});

	it('should update project name FizzBuzz to ReverseArray', (done) => {
		return request(server).put(`${endpoint}/1`)
		.send({'name':'ReverseArray'})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.then(res => {
				expect(res.status).toBe(200);
				expect(res.body.name).toBe('ReverseArray');
				done();
		})
	});

	it('should delete project by id (1)', () => {
		return request(server).delete(`${endpoint}/1`).then(res => {
			expect(res.status).toBe(200);
			expect(res.body.success).toBe('Project removed');
		})
	});

	it('should end with an empty table', () => {
		return request(server).get(endpoint).then(res => {
			expect(res.status).toBe(200);
			expect(res.body.length).toBe(0);
		})
	});
})