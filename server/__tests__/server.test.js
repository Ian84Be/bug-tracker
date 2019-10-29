const request = require('supertest');
const server = require('../api/server');

describe('server.js', () => {
	it('should be using the testing environment', () => {
		expect(process.env.DB_ENV).toBe('production');
	});

	it('should return JSON', async (done) => {
			return request(server).get('/').then(res => {
				expect(res.status).toBe(200);
				expect(res.type).toBe('text/html');
				done();
			})
	});
});