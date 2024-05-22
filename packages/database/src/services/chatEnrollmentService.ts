import { CreateEnrollmentChat } from "../types/chat";
import { ChatEnrollmentRepository } from "../repositories/chatEnrollmentRepository";
import { ChatRepository } from "../repositories/chatRepository";
import { UserRepository } from "../repositories/userRepository";
import { ChatEnrollment } from "@prisma/client";

export class ChatEnrollmentService {
  constructor(
    private userRepo: UserRepository,
    private chatRepo: ChatRepository,
    private chatEnrollmentRepo: ChatEnrollmentRepository,
  ) {}

  async createEnrollmentChat(enroll: CreateEnrollmentChat) {
    const user = await this.userRepo.getUserById(enroll.userId);

    if (!user) {
      throw new Error("Cannot find user to enroll on chat");
    }

    const chat = await this.chatRepo.getChatById(enroll.chatId);

    if (!chat) {
      throw new Error("Cannot find chat based to enroll user");
    }

    return this.chatEnrollmentRepo.createEnrollmentChat({
      userId: user.id,
      chatId: chat.id,
    });
  }

  async getUserChatEnrollments(
    userId: string,
  ): Promise<ChatEnrollment[] | null> {
    const user = await this.userRepo.getUserById(userId);

    if (!user) {
      throw new Error("Cannot find user");
    }

    return await this.chatEnrollmentRepo.findUserChatEnrollments(userId);
  }

  async getUserChatEnrollmentById(
    userId: string,
    chatId: string,
  ): Promise<ChatEnrollment[] | null> {
    const user = await this.userRepo.getUserById(userId);

    if (!user) {
      throw new Error("Cannot find user");
    }

    return await this.chatEnrollmentRepo.findUserChatEnrollments(userId);
  }

}
