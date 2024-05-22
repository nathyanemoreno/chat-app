import { Chat } from "@prisma/client";
import { CreateChat, UpdateChat } from "../types/chat";
import { ChatRepository } from "../repositories/chatRepository";
import { UserRepository } from "../repositories/userRepository";

export class ChatService {
  constructor(
    private userRepo: UserRepository,
    private chatRepo: ChatRepository,
  ) {}

  async createChat(chat: CreateChat) {
    return this.chatRepo.createChat(chat);
  }

  async updateChat(chat: UpdateChat) {
    return this.chatRepo.updateChat(chat);
  }

  async deleteChat(chatId: string) {
    return this.chatRepo.deleteChat(chatId);
  }

  async getChatById(chatId: string): Promise<Chat | null> {
    try {
      return this.chatRepo.getChatById(chatId);
    } catch (err) {
      throw new Error("Error fetching chat by id");
    }
  }

  async getChatsByUserEmail(email: string) {
    try {
      const user = await this.userRepo.getUserById(email);
      if (user) {
        return this.chatRepo.getChatById(user.id);
      } else {
        throw new Error(`User ${email} does not exist`);
      }
    } catch (err) {
      throw new Error("Error getting chat by user email");
    }
  } 
}
