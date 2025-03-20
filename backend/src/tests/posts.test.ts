import request from "supertest";
import app from "../app";
import mongoose from "mongoose";
import User from "../models/userModel";

describe("Post Routes", () => {
  let token: string;
  let postId: string;

  beforeAll(async () => {
    const dbUrl = "mongodb://localhost:27017/posts-tests";
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
  });

  afterAll(async () => {
    await mongoose?.connection?.db?.dropDatabase();
    await mongoose.disconnect();
  });

  it("should create a new post", async () => {
    const response = await request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Post",
        content: "Test Content",
        subtitle: "Test Subtitle",
        category: "Test category",
        imageSrc: "test"
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("title", "Test Post");
    postId = response.body._id;
  });

  it("should fetch all posts", async () => {
    const response = await request(app).get("/posts");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should fetch a single post by ID", async () => {
    const response = await request(app).get(`/posts/${postId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("_id", postId);
  });

  it("should update a post", async () => {
    const response = await request(app)
      .put(`/posts/${postId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Updated Title",
        content: "Updated Content",
        subtitle: "Updated Subtitle",
        category: "Updated Category"
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("title", "Updated Title");
  });

  it("should delete a post", async () => {
    const response = await request(app)
      .delete(`/posts/${postId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
});
