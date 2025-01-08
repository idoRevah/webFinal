import request from 'supertest';
import app from '../app';

describe('Comment Routes', () => {
  it('should fetch all comments for a post', async () => {
    const postId = 'valid-post-id'; // Replace with an actual post ID during integration
    const response = await request(app).get(`/comments/${postId}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should create a comment for a post with valid data', async () => {
    const token = 'valid-jwt-token'; // Replace with an actual token during integration
    const postId = 'valid-post-id';
    const commentData = { content: 'This is a test comment.' };

    const response = await request(app)
      .post(`/comments/${postId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(commentData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('content', commentData.content);
  });

  it('should return 401 when creating a comment without a token', async () => {
    const postId = 'valid-post-id';
    const commentData = { content: 'Unauthorized comment.' };

    const response = await request(app).post(`/comments/${postId}`).send(commentData);
    expect(response.status).toBe(401);
  });
});
