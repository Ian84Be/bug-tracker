const request = require('supertest');
const server = require('../api/server');
const go = require('../api/crud');
const endpoint = '/api/users';

describe('users-router.js', () => {
	it('should start with an empty users table', () => {
		return request(server).get('/api/users').then(res => {
			expect(res.status).toBe(200);
			expect(res.body.length).toBe(100);
		})
	})
})