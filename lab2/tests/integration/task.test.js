const request = require('supertest');
const app = require('../../src/app');

describe('Task API', () => {

  test('Create task', async () => {

    const res = await request(app)
      .post('/tasks')
      .send({
        title: 'Test',
        deadline: '2030-01-01'
      });

    expect(res.statusCode).toBe(201);

  });

});