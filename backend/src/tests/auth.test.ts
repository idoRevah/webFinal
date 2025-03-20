import request from "supertest";
import app from "../app";
import mongoose from "mongoose";
import User from "../models/userModel";

describe("Auth Routes", () => {

  let testUser = { username: "testuser", email: "test@example.com", password: "password123" };
  let userId = "";
  let token = "";
  let refreshToken = "";

  beforeAll(async () => {
    const dbUrl = "mongodb://localhost:27017/auth-tests";
    await mongoose.connect(dbUrl);
    await User.deleteMany();
  });

  /** Register a user */
  it("should register a new user", async () => {
    const response = await request(app).post("/auth/register").send(testUser);
    expect(response.status).toBe(201);
    userId = response.body.newUser._id;
  });

  /** Login a user */
  it("should log in the user and return tokens", async () => {
    const response = await request(app).post("/auth/login").send({
      username: testUser.username,
      password: testUser.password,
      email: testUser.email
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("accessToken");
    expect(response.body).toHaveProperty("refreshToken");
    token = response.body.accessToken;
    refreshToken = response.body.refreshToken;
  });

  /** Refresh token */
  it("should refresh the access token", async () => {
    const response = await request(app)
      .post("/auth/refresh")
      .send({ refreshToken });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("accessToken");
    token = response.body.accessToken;
  });

  /** Update user profile */
  it("should update the user profile", async () => {
    const response = await request(app)
      .put(`/auth/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ username: "updatedUser" });
    expect(response.status).toBe(200);
  });

  /** Logout user */
  it("should log out the user", async () => {
    const response = await request(app)
      .post("/auth/logout")
      .send({ refreshToken });
    expect(response.status).toBe(200);
  });

  /** Invalid login */
  it("should not log in with incorrect credentials", async () => {
    const response = await request(app).post("/auth/login").send({
      username: "testuser",
      password: "wrongpassword",
    });
    expect(response.status).toBe(401);
  });

  /** Unauthorized update */
  it("should return 401 for updating profile without a token", async () => {
    const response = await request(app)
      .put(`/auth/${userId}`)
      .send({ username: "unauthorizedUser" });
    expect(response.status).toBe(401);
  });

  it("should return 500 for invalid Google ID token", async () => {
    const response = await request(app)
      .post("/auth/google")
      .send({ idToken: "invalid-google-id-token" });

    expect(response.status).toBe(500);
  });
});
