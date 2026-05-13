const request = require('supertest');

const app = require('../../src/app');

describe('Get Tasks', () => {

  test('GET /tasks', async () => {

    const res =
      await request(app)
        .get('/tasks');

    expect(res.statusCode)
      .toBe(200);

  });

});
