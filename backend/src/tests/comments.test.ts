import request from "supertest";
import app from "../app";
import mongoose from "mongoose";
import User from "../models/userModel";

describe("Comment Routes", () => {
  let token: string;
  let postId: string;
  let commentId: string;

  beforeAll(async () => {
    const dbUrl = "mongodb://localhost:27017/comments-tests";
    await mongoose.connect(dbUrl);
    await User.deleteMany();
    
    await request(app).post('/auth/register').send({
      email: 'try@example.com',
      username: 'testuser',
      password: 'password123',
    });

    const loginResponse = await request(app).post('/auth/login').send({
      username: 'testuser',
      password: 'password123',
    });
    token = loginResponse.body.accessToken;

    const postResponse = await request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Post",
        content: "Test Content",
        subtitle: "Test Subtitle",
        category: "Test category",
        imageSrc: "test"
      });

    postId = postResponse.body._id;
  });

  it("should create a comment for a post", async () => {
    const response = await request(app)
      .post(`/posts/${postId}/comments`)
      .set("Authorization", `Bearer ${token}`)
      .send({ content: "Test Comment" });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("content", "Test Comment");
    commentId = response.body._id;
  });

  it("should fetch all comments for a post", async () => {
    const response = await request(app).get(`/posts/${postId}/comments`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
