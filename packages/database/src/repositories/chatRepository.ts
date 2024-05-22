import { Chat, PrismaClient } from "@prisma/client";
import { Context } from "../context";
import { CreateChat, UpdateChat } from "../types/chat";

export class ChatRepository {
  private prisma: PrismaClient;

  constructor(private ctx: Context) {
    this.prisma = this.ctx.prisma;
  }

  async createChat(chat: CreateChat) {
    return await this.prisma.chat.create({
      data: {
        ...chat,
      },
    });
  }

  async updateChat(chat: UpdateChat) {
    return await this.prisma.chat.update({
      where: { id: chat.id },
      data: {
        ...chat,
      },
    });
  }

  async deleteChat(chatId: string) {
    return await this.prisma.chat.delete({
      where: { id: chatId },
    });
  }

  async getChatById(chatId: string): Promise<Chat | null> {
    return await this.prisma.chat.findUnique({
      where: {
        id: chatId,
      },
    });
  }
}
