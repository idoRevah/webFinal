import request from 'supertest';
import app from '../app';

describe('User Routes', () => {
  it('should fetch a user profile by ID', async () => {
    const userId = 'valid-user-id'; // Replace with an actual user ID during integration
    const response = await request(app).get(`/users/${userId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', userId);
  });

  it('should update a user profile with valid data', async () => {
    const userId = 'valid-user-id';
    const token = 'valid-jwt-token'; // Replace with an actual token during integration
    const updateData = { username: 'Updated Username' };

    const response = await request(app)
      .put(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updateData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('username', updateData.username);
  });

  it('should return 401 when updating a profile without a token', async () => {
    const userId = 'valid-user-id';
    const updateData = { username: 'Unauthorized Update' };

    const response = await request(app).put(`/users/${userId}`).send(updateData);
    expect(response.status).toBe(401);
  });
});
