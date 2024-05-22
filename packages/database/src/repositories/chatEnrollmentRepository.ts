import { ChatEnrollment, PrismaClient } from "@prisma/client";
import { Context } from "../context";
import { CreateEnrollmentChat } from "../types/chat";

export class ChatEnrollmentRepository {
  private prisma: PrismaClient;

  constructor(private ctx: Context) {
    this.prisma = this.ctx.prisma;
  }

  async createEnrollmentChat(chat: CreateEnrollmentChat) {
    return await this.prisma.chatEnrollment.create({
      data: chat,
    });
  }

  async deleteEnrollmentChat(enrollId: string) {
    return await this.prisma.chatEnrollment.delete({
      where: { id: enrollId },
    });
  }

  async findChatEnrollmentById(enrollId: string) {
    return await this.prisma.chatEnrollment.findUnique({
      where: {
        id: enrollId,
      },
    });
  }

  async findUserChatEnrollments(
    userId: string,
  ): Promise<ChatEnrollment[] | null> {
    return await this.prisma.chatEnrollment.findMany({
      where: {
        userId: userId,
      },
    });
  }
}

