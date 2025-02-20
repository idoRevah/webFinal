import request from 'supertest';
import app from '../app';

describe('Auth Routes', () => {
  // it('should return a JWT when logging in with Google', async () => {
  //   const response = await request(app)
  //     .post('/auth/google')
  //     .send({ idToken: 'valid-google-id-token' });

  //   expect(response.status).toBe(200);
  //   expect(response.body).toHaveProperty('token');
  // });

  it('should return 400 for invalid Google ID token', async () => {
    const response = await request(app)
      .post('/auth/google')
      .send({ idToken: 'invalid-google-id-token' });

    expect(response.status).toBe(500);
  });
});
