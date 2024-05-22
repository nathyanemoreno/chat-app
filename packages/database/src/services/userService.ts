import { User } from "@prisma/client";
import { UserRepository } from "../repositories/userRepository";
import { CreateUser, UpdateUser } from "../types/user";

export class UserService {
  constructor(private userRepo: UserRepository) {}

  async createUser(user: CreateUser): Promise<User | null> {
    try {
      const newUser = await this.userRepo.createUser(user);
      return newUser;
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Failed to create user");
    }
  }

  async deleteUser(userId: string): Promise<User> {
    try {
      const deletedUser = await this.userRepo.deleteUser(userId);
      return deletedUser;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw new Error("Failed to delete user");
    }
  }

  async updateUser(user: UpdateUser): Promise<User> {
    try {
      const updatedUser = await this.userRepo.updateUser(user);
      return updatedUser;
    } catch (error) {
      console.error("Error updating user:", error);
      throw new Error("Failed to update user");
    }
  }

  async getUserById(userId: string): Promise<User | null> {
    try {
      const user = await this.userRepo.getUserById(userId);
      return user;
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      throw new Error("Failed to get user by ID");
    }
  }

  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.userRepo.getUserByEmail(email);
      return user;
    } catch (error) {
      console.error("Error fetching user by email:", error);
      throw new Error("Failed to get user by email");
    }
  }

  async getAllUsers(): Promise<User[] | null> {
    return await this.userRepo.findAllUsers();
  }
}
