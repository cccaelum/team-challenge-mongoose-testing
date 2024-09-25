const routes = require('./routes/posts.js');
const app = require('./app'); 
const request = require('supertest');


describe('POST /create', () => {
    it('should create a new post when valid data is provided', async () => {
        const res = await request(app)
            .post('/create')
            .json({
                title: 'My First Post',
                content: 'This is the content of my first post.'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.title).toEqual('My First Post');
    });

    it('should return 400 if title is missing', async () => {
        const res = await request(app)
            .post('/create')
            .json({
                content: 'This is the content of my post without a title.'
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('Title is required');
    });
});