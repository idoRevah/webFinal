import request from "supertest";
import app from "../app";

describe("Post Routes", () => {
  let token: string;
  let postId: string;

  beforeAll(async () => {
    // Authenticate to get a valid token
    const authResponse = await request(app)
      .post("/auth/google")
      .send({ idToken: "valid-google-id-token" });

    token = authResponse.body.token;
  });

  it("should create a new post", async () => {
    const response = await request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Test Post", content: "Test Content" });

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
      .send({ title: "Updated Title", content: "Updated Content" });

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
