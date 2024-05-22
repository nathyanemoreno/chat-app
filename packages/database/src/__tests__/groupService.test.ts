import { Context, createMockContext } from "../../src/context"; // Adjust the import according to your file structure
import { GroupRepository } from "../repositories/groupRepository";
import { GroupService } from "../services/groupService";
import { UserRepository } from "./../repositories/userRepository";

let mockCtx: ReturnType<typeof createMockContext>;
let groupService: GroupService;
let groupRepository: GroupRepository;
let userRepository: UserRepository;

beforeEach(() => {
  mockCtx = createMockContext();
  groupRepository = new GroupRepository(mockCtx as unknown as Context);
  userRepository = new UserRepository(mockCtx as unknown as Context);
  groupService = new GroupService(userRepository, groupRepository);
});

describe("GroupService", () => {
  test("createGroup should create a group", async () => {
    const date = new Date();
    const groupParams = {
      name: "Rich",
      creatorId: "1",
      groupDetails: "Description for group",
    };
    const mockGroup = {
      ...groupParams,
      id: "1",
      groupDetails: "Description for group",
      createdAt: date,
    };

    // Mock Prisma model to simulate a Group created
    mockCtx.prisma.group.create.mockResolvedValue(mockGroup);

    // Create a group with required params
    const createdGroup = await groupService.createGroup(groupParams);

    expect(mockCtx.prisma.group.create).toHaveBeenCalledWith({
      data: { name: groupParams.name },
    });

    // Compare created group with expected values
    expect(createdGroup).toEqual(mockGroup);
  });

  test("deleteGroup should delete a group", async () => {
    const date = new Date();
    const groupParams = {
      name: "Rich",
      creatorId: "1",
    };
    const mockGroup = {
      groupDetails: "Description for group",
      ...groupParams,
      id: "1",
      createdAt: date,
    };

    // Mock Prisma model to simulate a Group created
    mockCtx.prisma.group.delete.mockResolvedValue(mockGroup);

    // Create a group with required params
    const deletedGroup = await groupService.deleteGroup(mockGroup.id);

    expect(mockCtx.prisma.group.delete).toHaveBeenCalledWith({
      where: { id: mockGroup.id },
    });

    // Compare deleted group with expected values
    expect(deletedGroup).toEqual(mockGroup);
  });

  test("getGroupById should return group based on id", async () => {
    const date = new Date();
    const groupParams = {
      name: "Rich",
      creatorId: "1",
    };
    const mockGroup = {
      groupDetails: "Description for group",
      ...groupParams,
      id: "1",
      createdAt: date,
    };

    mockCtx.prisma.group.findUnique.mockResolvedValue(mockGroup);

    const group = await groupService.getGroupById(mockGroup.id);

    expect(mockCtx.prisma.group.findUnique).toHaveBeenCalledWith({
      where: {
        id: mockGroup.id,
      },
    });

    expect(group).toEqual(mockGroup);
  });

  test("getGroupById should return empty when not find group based on id", async () => {
    const groupId = "2";

    mockCtx.prisma.group.findUnique.mockResolvedValue(null);

    const group = await groupService.getGroupById(groupId);

    expect(mockCtx.prisma.group.findUnique).toHaveBeenCalledWith({
      where: {
        id: groupId,
      },
    });

    expect(group).toBeNull();
  });

  test("updateGroup should update group", async () => {
    const date = new Date();
    const groupParams = {
      id: "1",
      name: "Rich",
      groupDetails: "Description for group",
    };
    const mockGroup = {
      groupDetails: "Description for group",
      id: "1",
      creatorId: "1",
      name: "Richmond",
      createdAt: date,
    };

    mockCtx.prisma.group.update.mockResolvedValue(mockGroup);

    const group = await groupService.updateGroup(groupParams);

    expect(mockCtx.prisma.group.update).toHaveBeenCalledWith({
      where: {
        id: groupParams.id,
      },
      data: {
        ...groupParams,
      },
    });

    expect(group).toEqual(mockGroup);
  });

  test("should handle database errors when creating group", async () => {
    const groupParams = {
      name: "Rich",
      creatorId: "1",
      groupDetails: "Description for group",
    };

    // Mock Prisma model to simulate a database error
    mockCtx.prisma.group.create.mockRejectedValue(
      new Error("Error creating group"),
    );

    await expect(groupService.createGroup(groupParams)).rejects.toThrow(
      "Error creating group",
    );

    // Check that Prisma create function was called with the correct data
    expect(mockCtx.prisma.group.create).toHaveBeenCalledWith({
      data: { name: groupParams.name },
    });
  });

  test("should handle database errors when getting group by id", async () => {
    const groupId = "1";

    // Mock Prisma model to simulate a database error
    mockCtx.prisma.group.findUnique.mockRejectedValue(
      new Error("Error fetching group by id"),
    );

    await expect(groupService.getGroupById(groupId)).rejects.toThrow(
      "Error fetching group by id",
    );

    // Check that Prisma create function was called with the correct data
    expect(mockCtx.prisma.group.findUnique).toHaveBeenCalledWith({
      where: {
        id: groupId,
      },
    });
  });

  test("should handle database errors when deleting group by id", async () => {
    const groupId = "1";

    // Mock Prisma model to simulate a database error
    mockCtx.prisma.group.delete.mockRejectedValue(
      new Error("Error deleting group"),
    );

    await expect(groupService.deleteGroup(groupId)).rejects.toThrow(
      "Error deleting group",
    );

    // Check that Prisma create function was called with the correct data
    expect(mockCtx.prisma.group.delete).toHaveBeenCalledWith({
      where: {
        id: groupId,
      },
    });
  });
});
