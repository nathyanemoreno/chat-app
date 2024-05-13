import { hashPassword } from "../../../utils/hash";
import { Context, MockContext, createMockContext } from "../../context";
import { createUser, updateUsername } from "../functions-with-context";

let mockCtx: MockContext;
let ctx: Context;

beforeEach(() => {
  mockCtx = createMockContext();
  ctx = mockCtx as unknown as Context;
});

jest.mock("../../../utils/hash", () => ({
  hashPassword: jest
    .fn()
    .mockImplementation((password: string) => Promise.resolve(password)),
}));

test("should create new user ", async () => {
  const user = {
    id: "1",
    name: "Rich",
    email: "hello@prisma.io",
    nickname: "Ri",
    password: "hellotoyou",
  };
  mockCtx.prisma.user.create.mockResolvedValue(user);

  const password = await hashPassword(user.password);

  await expect(createUser(user, ctx)).resolves.toEqual({
    id: "1",
    name: "Rich",
    email: "hello@prisma.io",
    password: password,
    nickname: "Ri",
  });
});

test("should update a users name ", async () => {
  const user = {
    id: "1",
    name: "Rich Haines",
    email: "hello@prisma.io",
    nickname: "Rich",
    password: "helloagain",
  };
  mockCtx.prisma.user.update.mockResolvedValue(user);

  const password = await hashPassword(user.password);

  await expect(updateUsername(user, ctx)).resolves.toEqual({
    id: "1",
    name: "Rich Haines",
    email: "hello@prisma.io",
    password: password,
    nickname: "Rich",
  });
});

//test("should fail if user does not accept terms", async () => {
//  const user = {
//    id: "1",
//    name: "Rich Haines",
//    email: "hello@prisma.io",
//    acceptTermsAndConditions: false,
//  };

//  mockCtx.prisma.user.create.mockImplementation();

//  await expect(createUser(user, ctx)).resolves.toEqual(
//    new Error("User must accept terms!"),
//  );
//});
