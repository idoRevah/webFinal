import request from 'supertest';
import app from '../app';

describe('Auth Routes', () => {
  it('should authenticate and return a JWT with a valid Google ID token', async () => {
    const idToken = 'valid-google-id-token'; // Replace with an actual valid ID token during testing

    const response = await request(app)
      .post('/auth/google')
      .send({ idToken });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should return 400 for an invalid Google ID token', async () => {
    const idToken = 'invalid-google-id-token'; // Simulate an invalid token

    const response = await request(app)
      .post('/auth/google')
      .send({ idToken });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Invalid ID token');
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
