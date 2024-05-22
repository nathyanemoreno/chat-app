import { GroupEnrollment, PrismaClient, UserRole } from "@prisma/client";
import { Context } from "../context";
import { CreateEnrollmentGroup, GroupUsers } from "../types/group-enrollment";

export class GroupEnrollmentRepository {
  private prisma: PrismaClient;

  constructor(private ctx: Context) {
    this.prisma = this.ctx.prisma;
  }

  async createEnrollmentGroup(enrollGroup: CreateEnrollmentGroup) {
    return await this.prisma.groupEnrollment.create({
      data: enrollGroup,
    });
  }

  async deleteEnrollmentGroup(enrollId: string) {
    return await this.prisma.groupEnrollment.delete({
      where: { id: enrollId },
    });
  }

  async findGroupEnrollmentById(enrollId: string) {
    return await this.prisma.groupEnrollment.findUnique({
      where: {
        id: enrollId,
      },
    });
  }

  async findGroupEnrollments(
    groupId: string,
  ): Promise<GroupEnrollment[] | null> {
    return this.prisma.groupEnrollment.findMany({
      where: { groupId: groupId },
      include: {
        user: true,
      },
    });
  }

  async findUserEnrollments(userId: string): Promise<GroupEnrollment[] | null> {
    return await this.prisma.groupEnrollment.findMany({
      where: {
        userId: userId,
      },
    });
  }

  async findUsersByEnrollId(enrollId: string): Promise<GroupUsers | null> {
    return await this.prisma.groupEnrollment.findMany({
      where: {
        id: enrollId,
      },
      include: {
        user: true,
      },
    });
  }

  async findEnrollmentsByRole(
    role: UserRole,
  ): Promise<GroupEnrollment[] | null> {
    return await this.prisma.groupEnrollment.findMany({
      where: { role: role },
    });
  }
}
