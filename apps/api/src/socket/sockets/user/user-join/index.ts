import { log } from "@repo/logger";
import { Socket } from "socket.io";
import { User } from "~/model/User";
import { logger } from "~/server/createServer";
import { userSocketMap } from "~/socket/createSocket";

const onUserJoin = (socket: Socket) => {
  const user = socket.data.user as User;
  logger.logger.info({ user })

  userSocketMap[user.id] = { socketId: socket.id };

  log(`User "${user.name}" : ${socket.id}`);
  
  socket.broadcast.emit("user:joined", socket.data.user);
};
export { onUserJoin };
