import { ENV_VARIABLES } from "../config/env";
import bcrypt from "bcrypt";

// Function to hash a password using bcrypt with the retrieved salt rounds
async function hashPassword(password: string): Promise<string> {
  try {
    const saltRounds = ENV_VARIABLES.SALT_ROUNDS;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error;
  }
}

// Function to verify a password
async function verifyPassword(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
  try {
    // Use bcrypt to compare the entered password with the stored hash
    const match = await bcrypt.compare(plainTextPassword, hashedPassword);
    return match;
  } catch (error) {
    console.error("Error verifying password:", error);
    throw error;
  }
}

export { hashPassword, verifyPassword };
