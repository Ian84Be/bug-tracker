const request = require('supertest');
const server = require('../api/server');
const endpoint = '/api/users';

describe('users-router.js', () => {
	it('should start with an empty users table', () => {
		return request(server).get(endpoint).then(res => {
			expect(res.status).toBe(200);
			expect(res.body.length).toBe(0);
		})
	});

	it('should create a new user named steve', () => {
		const newUser = {
			"id":1,
			"username": "steve",
			"password": "dave",
			"email": "e@m",
			"role": "user"
		};
		return request(server).post(endpoint)
			.send(newUser)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.then(res => {
			expect(res.status).toBe(201);
			expect(res.body.username).toBe('steve');
		})
	});

	it('should return steve by id (1)', () => {
		return request(server).get(`${endpoint}/1`).then(res => {
			expect(res.status).toBe(200);
			expect(res.body.username).toBe('steve');
		})
	});

	it('should change username steve to DAVE', () => {
		return request(server).put(`${endpoint}/1`)
		.send({'username':'DAVE'})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.then(res => {
			expect(res.status).toBe(200);
			expect(res.body.username).toBe('DAVE');
		})
	});

	it('should delete user by id (1)', () => {
		return request(server).delete(`${endpoint}/1`).then(res => {
			expect(res.status).toBe(200);
			expect(res.body.success).toBe('User removed');
		})
	});

	it('should end with an empty users table', () => {
		return request(server).get(endpoint).then(res => {
			expect(res.status).toBe(200);
			expect(res.body.length).toBe(0);
		})
	});
})