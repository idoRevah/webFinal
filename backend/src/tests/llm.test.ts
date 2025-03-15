import request from "supertest";
import app from "../app";

describe("LLM Routes", () => {
  it("should return a response from the LLM API", async () => {
    const response = await request(app)
      .post("/llm/send")
      .send({ text: "Explain AI" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("contents");
  });

  it("should return 400 if text is missing", async () => {
    const response = await request(app).post("/llm/send").send({});
    expect(response.status).toBe(400);
  });
});
