import request from "supertest";
import app from "../app";

describe("Comment Routes", () => {
  let token: string;
  let postId: string;
  let commentId: string;

  beforeAll(async () => {
    const authResponse = await request(app)
      .post("/auth/google")
      .send({ idToken: "valid-google-id-token" });

    token = authResponse.body.token;

    const postResponse = await request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Test Post", content: "Test Content" });

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
