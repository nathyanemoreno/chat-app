import supertest from "supertest";
import { createServer } from "~/server/createServer";

describe("createServer", () => {
  it("health check returns 200", async () => {
    await supertest(createServer())
      .get("/healthz")
      .expect(200)
      .then((res) => {
        expect(res.body.ok).toBe(true);
      });
  });
});
