import { log } from "console";
import { MockContext, createMockContext } from "../context";
import { UserService } from "../services/userService";
import { UserRepository } from "./../repositories/userRepository";

let mockCtx: ReturnType<typeof createMockContext>;
let userService: UserService;
let userRepository: UserRepository;

beforeEach(() => {
  mockCtx = createMockContext();
  userRepository = new UserRepository(mockCtx as unknown as MockContext);
  userService = new UserService(userRepository);
});

describe("UserRepository", () => {
  test("should create an user", async () => {
    const date = new Date();
    const userParams = {
      email: "user@example.com",
      password: "password",
    };
    const userMock = {
      ...userParams,
      id: "1",
      name: "John",
      nickname: "Johnny",
      status: "I am on Chat",
      createdAt: date,
    };

    mockCtx.prisma.user.create.mockResolvedValue(userMock);

    const user = await userService.createUser(userParams);

    expect(mockCtx.prisma.user.create).toHaveBeenCalledWith({
      data: userParams,
    });

    expect(user).toEqual(userMock);
  });

  test("should delete an user", async () => {
    const chatId = "1";
    const date = new Date();
    const userParams = {
      email: "user@example.com",
      password: "password",
    };
    const userMock = {
      ...userParams,
      id: "1",
      name: "John",
      nickname: "Johnny",
      status: "I am on Chat",
      createdAt: date,
    };

    mockCtx.prisma.user.delete.mockResolvedValue(userMock);

    const deletedChat = await userService.deleteUser(chatId);

    expect(mockCtx.prisma.user.delete).toHaveBeenCalledWith({
      where: {
        id: chatId,
      },
    });

    expect(deletedChat).toEqual(userMock);
  });

  test("should update an user", async () => {
    const chatId = "1";
    const date = new Date();
    const userMock = {
      email: "user@example.com",
      password: "password",
      id: "1",
      name: "John",
      nickname: "Johnny",
      status: "I am on Chat",
      createdAt: date,
    };

    mockCtx.prisma.user.update.mockResolvedValue(userMock);

    const updatedUser = await userService.updateUser({
      ...userMock,
      name: "Johnny",
    });

    expect(mockCtx.prisma.user.update).toHaveBeenCalledWith({
      where: {
        id: chatId,
      },
      data: {
        ...userMock,
        name: "Johnny",
      },
    });

    expect(updatedUser).toEqual(userMock);
  });

  test("should get user by id", async () => {
    const chatId = "1";
    const date = new Date();
    const userMock = {
      email: "user@example.com",
      password: "password",
      id: "1",
      name: "John",
      nickname: "Johnny",
      status: "I am on Chat",
      createdAt: date,
    };

    mockCtx.prisma.user.findUnique.mockResolvedValue(userMock);

    const updatedUser = await userService.getUserById(chatId);

    expect(mockCtx.prisma.user.findUnique).toHaveBeenCalledWith({
      where: {
        id: chatId,
      },
    });

    expect(updatedUser).toEqual(userMock);
  });
});
