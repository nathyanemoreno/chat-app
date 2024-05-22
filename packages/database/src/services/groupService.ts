import { Group } from "@prisma/client";
import { GroupRepository } from "../repositories/groupRepository";
import { UserRepository } from "../repositories/userRepository";
import { CreateGroup, UpdateGroup } from "../types/group";

export class GroupService {
  constructor(
    private userRepo: UserRepository,
    private groupRepo: GroupRepository,
  ) {}

  async createGroup(group: CreateGroup) {
    return this.groupRepo.createGroup(group);
  }

  async updateGroup(group: UpdateGroup) {
    return this.groupRepo.updateGroup(group);
  }

  async deleteGroup(groupId: string) {
    return this.groupRepo.deleteGroup(groupId);
  }

  async getGroupById(groupId: string): Promise<Group | null> {
    try {
      return this.groupRepo.findGroupById(groupId);
    } catch (err) {
      throw new Error("Error fetching group by id");
    }
  }

  async getGroupsByUserEmail(email: string) {
    try {
      const user = await this.userRepo.getUserById(email);
      if (user) {
        return this.groupRepo.findGroupById(user.id);
      } else {
        throw new Error(`User ${email} does not exist`);
      }
    } catch (err) {
      throw new Error("Error getting group by user email");
    }
  }
}
