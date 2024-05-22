import { Context, createMockContext } from "../../src/context"; // Adjust the import according to your file structure
import { ChatRepository } from "../repositories/chatRepository";
import { ChatService } from "../services/chatService";
import { UserRepository } from "./../repositories/userRepository";

let mockCtx: ReturnType<typeof createMockContext>;
let chatService: ChatService;
let chatRepository: ChatRepository;
let userRepository: UserRepository;

beforeEach(() => {
  mockCtx = createMockContext();
  chatRepository = new ChatRepository(mockCtx as unknown as Context);
  userRepository = new UserRepository(mockCtx as unknown as Context);
  chatService = new ChatService(userRepository, chatRepository);
});

describe("ChatService", () => {
  test("createChat should create a chat", async () => {
    const date = new Date();
    const chatParams = {
      creatorId: "1",
    };
    const mockChat = {
      ...chatParams,
      id: "1",
      createdAt: date,
    };

    // Mock Prisma model to simulate a Chat created
    mockCtx.prisma.chat.create.mockResolvedValue(mockChat);

    // Create a chat with required params
    const createdChat = await chatService.createChat(chatParams);

    expect(mockCtx.prisma.chat.create).toHaveBeenCalledWith({
      data: {
        ...chatParams,
      },
    });

    // Compare created chat with expected values
    expect(createdChat).toEqual(mockChat);
  });

  test("deleteChat should delete a chat", async () => {
    const date = new Date();
    const chatParams = {
      name: "Rich",
      creatorId: "1",
    };
    const mockChat = {
      ...chatParams,
      id: "1",
      createdAt: date,
    };

    // Mock Prisma model to simulate a Chat created
    mockCtx.prisma.chat.delete.mockResolvedValue(mockChat);

    // Create a chat with required params
    const deletedChat = await chatService.deleteChat(mockChat.id);

    expect(mockCtx.prisma.chat.delete).toHaveBeenCalledWith({
      where: { id: mockChat.id },
    });

    // Compare deleted chat with expected values
    expect(deletedChat).toEqual(mockChat);
  });

  test("getChatById should return chat based on id", async () => {
    const date = new Date();
    const chatParams = {
      name: "Rich",
      creatorId: "1",
    };
    const mockChat = {
      ...chatParams,
      id: "1",
      createdAt: date,
    };

    mockCtx.prisma.chat.findUnique.mockResolvedValue(mockChat);

    const chat = await chatService.getChatById(mockChat.id);

    expect(mockCtx.prisma.chat.findUnique).toHaveBeenCalledWith({
      where: {
        id: mockChat.id,
      },
    });

    expect(chat).toEqual(mockChat);
  });

  test("getChatById should return empty when not find chat based on id", async () => {
    const chatId = "2";

    mockCtx.prisma.chat.findUnique.mockResolvedValue(null);

    const chat = await chatService.getChatById(chatId);

    expect(mockCtx.prisma.chat.findUnique).toHaveBeenCalledWith({
      where: {
        id: chatId,
      },
    });

    expect(chat).toBeNull();
  });

  test("updateChat should update chat", async () => {
    const date = new Date();
    const chatParams = {
      id: "1",
      creatorId: "2",
    };
    const mockChat = {
      id: "1",
      creatorId: "2",
      createdAt: date,
    };

    mockCtx.prisma.chat.update.mockResolvedValue(mockChat);

    const chat = await chatService.updateChat(chatParams);

    expect(mockCtx.prisma.chat.update).toHaveBeenCalledWith({
      where: {
        id: chatParams.id,
      },
      data: {
        ...chatParams,
      },
    });

    expect(chat).toEqual(mockChat);
  });

  test("should handle database errors when creating chat", async () => {
    const chatParams = {
      creatorId: "1",
    };

    // Mock Prisma model to simulate a database error
    mockCtx.prisma.chat.create.mockRejectedValue(
      new Error("Error creating chat"),
    );

    await expect(chatService.createChat(chatParams)).rejects.toThrow(
      "Error creating chat",
    );

    // Check that Prisma create function was called with the correct data
    expect(mockCtx.prisma.chat.create).toHaveBeenCalledWith({
      data: { ...chatParams },
    });
  });

  test("should handle database errors when getting chat by id", async () => {
    const chatId = "1";

    // Mock Prisma model to simulate a database error
    mockCtx.prisma.chat.findUnique.mockRejectedValue(
      new Error("Error fetching chat by id"),
    );

    await expect(chatService.getChatById(chatId)).rejects.toThrow(
      "Error fetching chat by id",
    );

    // Check that Prisma create function was called with the correct data
    expect(mockCtx.prisma.chat.findUnique).toHaveBeenCalledWith({
      where: {
        id: chatId,
      },
    });
  });

  test("should handle database errors when deleting chat by id", async () => {
    const chatId = "1";

    // Mock Prisma model to simulate a database error
    mockCtx.prisma.chat.delete.mockRejectedValue(
      new Error("Error deleting chat"),
    );

    await expect(chatService.deleteChat(chatId)).rejects.toThrow(
      "Error deleting chat",
    );

    // Check that Prisma create function was called with the correct data
    expect(mockCtx.prisma.chat.delete).toHaveBeenCalledWith({
      where: {
        id: chatId,
      },
    });
  });
});
