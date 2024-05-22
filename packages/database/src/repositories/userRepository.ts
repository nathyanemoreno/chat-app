import { PrismaClient, User } from "@prisma/client";
import { Context } from "../context";
import { CreateUser, UpdateUser } from "../types/user";

export class UserRepository {
  private prisma: PrismaClient;

  constructor(private ctx: Context) {
    this.prisma = this.ctx.prisma;
  }

  async createUser(user: CreateUser): Promise<User | null> {
    return await this.prisma.user.create({
      data: user,
    });
  }

  async deleteUser(userId: string) {
    return await this.prisma.user.delete({
      where: { id: userId },
    });
  }

  async updateUser(user: UpdateUser) {
    return await this.prisma.user.update({
      where: { id: user.id },
      data: user,
    });
  }

  async getUserById(userId: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async findAllUsers(): Promise<User[] | null> {
    return await this.prisma.user.findMany();
  }
}
