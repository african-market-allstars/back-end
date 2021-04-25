const server = require('./server.js');
const request = require('supertest');

const db = require('../data/dbConfig.js');
const testUser = { username: 'test', email: 'email@emailtest.com', password: 'password' };

describe('server.js', () => {
	it('it should return status code 200', async () => {
		const res = await request(server).get('/');
		expect(res.status).toBe(200);
	});

	it("it should return 'text/html in charset utf-8'", async () => {
		const res = await request(server).get('/');
		expect(res.get('Content-Type')).toEqual('text/html; charset=utf-8');
	});
});

describe('registering a new user', () => {
	it('should return with status code of 201', async () => {
		beforeEach(async () => {
			await db('users').truncate();
		});
		const res = await request(server).post('/api/auth/register').send(testUser);
		expect(res.status).toBe(201);
	});
	it('should return a status of 400', async () => {
		const res = await request(server)
			.post('/api/auth/register')
			.send({ name: 'test', email: 'email@emailtest.com', password: 'lskdjflskj' });
		expect(res.status).toBe(400);
	});
});

describe('login the user', () => {
	it('should return a status of 401', async () => {
		const res = await request(server).post('/api/auth/login').send({ username: 'test2', password: 'test2' });
		expect(res.status).toBe(401);
	});
});
