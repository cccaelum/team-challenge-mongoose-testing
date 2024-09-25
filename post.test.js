const app = require('./index.js'); 
const request = require('supertest'); //para testing de solicitudes HTTP


describe('POST /create', () => {
    it('should create a new post when valid data is provided', async () => {
        const res = await request(app) // simulamos una solicitud HTTP a la app
            .post('/create') 
            .send({
                title: 'My First Post',
                content: 'This is the content of my first post.'
            });
        expect(res.statusCode).toEqual(201); // Verificamos que el código de estado sea 201 (creado)
        expect(res.body).toHaveProperty('_id'); // Verificamos que el cuerpo de la respuesta tenga la propiedad _id (indicador de que el post fue creado).
        expect(res.body.title).toEqual('My First Post'); // Verificamos que el título del post en la respuesta coincida con el enviado
    });

    it('should return 400 if title is missing', async () => {
        const res = await request(app)
            .post('/create')
            .send({
                content: 'This is the content of my post without a title.'
            });
        expect(res.statusCode).toEqual(400); // Verificamos que el código de estado sea 400 (error del cliente)
        expect(res.body.message).toEqual('Title is required');
    });
});