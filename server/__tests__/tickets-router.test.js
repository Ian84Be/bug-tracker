const request = require('supertest');
const server = require('../api/server');
const db = require('../data/dbConfig');

beforeAll(async (done) => {
	await db('tickets').delete();
	await db('projects').delete();
	await db('users').delete();
	done()
});

afterAll(async (done) => {
	await db('tickets').delete();
	await db('projects').delete();
	await db('users').delete();
	done()
});

const endpoint = '/api/tickets';
describe('tickets-router.js', () => {
	it('should start with an empty table', () => {
		return request(server).get(endpoint).then(res => {
			expect(res.status).toBe(200);
			expect(res.body.length).toBe(0);
		})
	});

	describe('setup resource dependencies', () => {
		it('should create a new user named steve', () => {
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
			})
		});
	
		it('should create a new project named FizzBuzz ', () => {
			const newResource = {
				"id":1,
				"name": "FizzBuzz"
			};
			return request(server).post('/api/projects')
				.send(newResource)
				.set('Content-Type', 'application/json')
				.set('Accept', 'application/json')
				.then(res => {
				expect(res.status).toBe(201);
				expect(res.body.name).toBe('FizzBuzz');
			})
		});
	});

	describe('perform crud actions', () => {
		it('should create a new ticket for project FizzBuzz ', () => {
			const newResource = {
				"id":1,
				"date_created": "2019-10-30T05:43:02.579Z",
				"date_updated": "2019-10-30T05:43:02.579Z",
				"from_user_id": 1,
				"project_id":1,
				"subject":"fizzbuzz machine broke",
				"content":"understandable, thank you"
			};
			return request(server).post(endpoint)
				.send(newResource)
				.set('Content-Type', 'application/json')
				.set('Accept', 'application/json')
				.then(res => {
				expect(res.status).toBe(201);
				expect(res.body.subject).toBe("fizzbuzz machine broke");
			})
		});
	
		it('should return FizzBuzz by id (1)', () => {
			return request(server).get(`${endpoint}/1`).then(res => {
				expect(res.status).toBe(200);
				expect(res.body.subject).toBe("fizzbuzz machine broke");
			})
		});
	
		it('should change ticket subject to BIG TROUBLE', () => {
			return request(server).put(`${endpoint}/1`)
			.send({'subject':'BIG TROUBLE'})
				.set('Content-Type', 'application/json')
				.set('Accept', 'application/json')
				.then(res => {
				expect(res.status).toBe(200);
				expect(res.body.subject).toBe('BIG TROUBLE');
			})
		});
	
		it('should delete ticket by id (1)', () => {
			return request(server).delete(`${endpoint}/1`).then(res => {
				expect(res.status).toBe(200);
				expect(res.body.success).toBe('Ticket removed');
			})
		});
	
		it('should end with an empty table', () => {
			return request(server).get(endpoint).then(res => {
				expect(res.status).toBe(200);
				expect(res.body.length).toBe(0);
			})
		});
	});

})