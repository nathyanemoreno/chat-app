import { GroupEnrollment, UserRole } from "@prisma/client";
import { GroupEnrollmentRepository } from "../repositories/groupEnrollmentRepository";
import { GroupRepository } from "../repositories/groupRepository";
import { UserRepository } from "../repositories/userRepository";
import { CreateEnrollmentGroup, GroupUsers } from "../types/group-enrollment";

export class GroupEnrollmentService {
  constructor(
    private userRepo: UserRepository,
    private groupRepo: GroupRepository,
    private groupEnrollmentRepo: GroupEnrollmentRepository,
  ) {}

  async createEnrollmentGroup(enrollGroup: CreateEnrollmentGroup) {
    const user = await this.userRepo.getUserById(enrollGroup.userId);

    if (!user) {
      throw new Error("Cannot find user to enrollGroup on group");
    }

    const group = await this.groupRepo.findGroupById(enrollGroup.groupId);

    if (!group) {
      throw new Error("Cannot find group based to enrollGroup user");
    }

    return this.groupEnrollmentRepo.createEnrollmentGroup(enrollGroup);
  }

  async getGroupEnrollmentsById(
    enrollId: string,
  ): Promise<GroupEnrollment | null> {
    return await this.groupEnrollmentRepo.findGroupEnrollmentById(enrollId);
  }

  async getUserEnrollments(userId: string): Promise<GroupEnrollment[] | null> {
    const user = await this.userRepo.getUserById(userId);

    if (!user) {
      throw new Error("Cannot find user");
    }

    return await this.groupEnrollmentRepo.findUserEnrollments(userId);
  }

  async getGroupEnrollments(
    groupId: string,
  ): Promise<GroupEnrollment[] | null> {
    return await this.groupEnrollmentRepo.findGroupEnrollments(groupId);
  }

  async getEnrollmentsByRole(
    role: UserRole,
  ): Promise<GroupEnrollment[] | null> {
    return await this.groupEnrollmentRepo.findEnrollmentsByRole(role);
  }

  async getUsersByEnrollId(enrollId: string): Promise<GroupUsers | null> {
    return await this.groupEnrollmentRepo.findUsersByEnrollId(enrollId);
  }
}
