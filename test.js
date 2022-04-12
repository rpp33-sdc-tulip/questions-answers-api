const request = require('supertest');
const app = require('./server/app');
// increase to 20 seconds due to long query times
jest.setTimeout(20000);

test('Add 2 + 2', () => {
  expect(2 + 2).toBe(4);
});

test('GET qa/questions returns status 200', async () => {
  const response = await request(app).get('/qa/questions?product_id=64625');
  // console.log('RESPONSE __________________', response);
  expect(response.statusCode).toBe(200);
});

test('GET answers returns status 500 if no id param', async () => {
  const response = await request(app).get('/qa/questions/:question_id/answers');
  // console.log('RESPONSE __________________', response);
  expect(response.statusCode).toBe(500);
});
