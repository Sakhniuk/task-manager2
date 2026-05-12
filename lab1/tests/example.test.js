const request = require('supertest');
const app = require('../src/app');

let token;

describe('API', () => {

  beforeAll(async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({ email: "test@test.com", password: "123456" });

    token = res.body.token;
  });

  test('Create task', async () => {
    const res = await request(app)
      .post('/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: "Test", deadline: "2030-01-01" });

    expect(res.statusCode).toBe(201);
  });

  test('Unauthorized', async () => {
    const res = await request(app).get('/tasks');
    expect(res.statusCode).toBe(401);
  });

});