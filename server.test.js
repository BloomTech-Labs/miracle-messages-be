const supertest = require('supertest');
const server = require('./server');

describe('server.js', () => {
  describe('get', () => {
    it('should return status 200', async () => {
      const user = await supertest(server)
        .get('/')
        .expect(200);
    });
  });
});

