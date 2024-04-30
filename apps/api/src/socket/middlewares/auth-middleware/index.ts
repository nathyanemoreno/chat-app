import { log } from "@repo/logger";
import { Socket } from "socket.io";
import { verifyToken } from "~/use-cases/auth-token/verify";
import { getUserById } from "~/use-cases/users/get-by-id";

const authMiddleware = async (socket: Socket, next: any) => {
  try {
    log("Checking user credentials on database...");

    const token =
      process.env.NODE_ENV == "development"
        ? socket.handshake.headers.auth_token
        : socket.handshake.auth.token;
    const user = await verifyToken(token);

    // Authentication
    if (user) {
      const databaseUser = await getUserById(user.userId);
      socket.data.user = databaseUser;

      return next();
    } else {
      throw new Error("thou shall not pass");
    }
  } catch (err) {
    next(new Error("thou shall not pass"));
  }
};

export { authMiddleware };
