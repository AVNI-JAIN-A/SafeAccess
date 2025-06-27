import request from 'supertest';
import app from '../src/index.js';

describe('Auth API', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        phone: '1234567890',
        password: 'password123',
        account_number: '123456789',
        card_number: '987654321'
      });
    expect(res.statusCode).toEqual(201);
  });
});
