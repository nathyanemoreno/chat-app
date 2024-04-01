import { UserMock } from "~/mocks/UserMock";
import { createServer } from "~/server/createServer";
import supertest from "supertest";

const user = new UserMock("1", "Nathyane", "Nymphare");

describe("authSignInController", () => {
  it("returns an authenticated user", async () => {
    await supertest(createServer())
      .get("/auth/sign-in")
      .send({ authToken: "" })
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({ user, token: "9230" });
      });
  }, 10000);
});
