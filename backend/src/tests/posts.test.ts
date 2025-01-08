import request from 'supertest';
import app from '../app';

describe('Auth Routes', () => {
  it('should initiate Google OAuth login', async () => {
    const response = await request(app).get('/auth/google');
    expect(response.status).toBe(302); // Expect a redirect
  });

  it('should refresh JWT with a valid refresh token', async () => {
    const refreshToken = 'valid-refresh-token'; // Replace with actual token during integration
    const response = await request(app)
      .post('/auth/refresh')
      .send({ refreshToken });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should return 401 for missing refresh token', async () => {
    const response = await request(app).post('/auth/refresh').send({});
    expect(response.status).toBe(401);
  });
});
