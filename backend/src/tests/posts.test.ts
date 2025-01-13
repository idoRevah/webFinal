import request from 'supertest';
import app from '../app';

describe('Post Routes', () => {
  it('should fetch all posts', async () => {
    const response = await request(app).get('/posts');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should create a new post with valid data', async () => {
    const token = 'valid-jwt-token'; // Replace with an actual token during integration
    const postData = { title: 'Test Post', content: 'This is a test post.' };

    const response = await request(app)
      .post('/posts')
      .set('Authorization', `Bearer ${token}`)
      .send(postData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('title', postData.title);
  });

  it('should return 401 when creating a post without a token', async () => {
    const postData = { title: 'Unauthorized Post', content: 'No auth token.' };

    const response = await request(app).post('/posts').send(postData);
    expect(response.status).toBe(401);
  });
});
