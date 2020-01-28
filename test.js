const request = require('supertest');
const app = require('./app');

describe('Login Endpoints', () => {
    it('should create a new post', async () => {
        const res = await request(app)
            .post('/api/authenticateuser/')
            .send({
                username: 'zwehtatnaing.liveid@gmail.com',
                password: 'P1234',
            });
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('data')
    });
});

describe('Create User Endpoints', () => {
    it('should create a new user', async () => {
        const res = await request(app)
            .post('/api/user/')
            .send({
                username: 'test@gmail.com',
                password: 'T1234',
                fullName: 'Test'
            });
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('data')
    });
});