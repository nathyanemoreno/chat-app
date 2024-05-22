import { Group, GroupEnrollment, PrismaClient, User } from "@prisma/client";
import { Context } from "../context";
import { CreateGroup, UpdateGroup } from "../types/group";

export class GroupRepository {
  private prisma: PrismaClient;

  constructor(private ctx: Context) {
    this.prisma = this.ctx.prisma;
  }

  async createGroup(group: CreateGroup) {
    return await this.prisma.group.create({
      data: {
        ...group,
      },
    });
  }

  async updateGroup(group: UpdateGroup) {
    return await this.prisma.group.update({
      where: { id: group.id },
      data: {
        ...group,
      },
    });
  }

  async deleteGroup(groupId: string) {
    return await this.prisma.group.delete({
      where: { id: groupId },
    });
  }

  async findGroupById(groupId: string): Promise<Group | null> {
    return await this.prisma.group.findUnique({
      where: {
        id: groupId,
      },
    });
  }
}
