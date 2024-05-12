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

export { hashPassword };
