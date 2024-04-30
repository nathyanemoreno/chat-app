import { log } from "@repo/logger";
import { Server as IOServer, Socket } from "socket.io";
import { User } from "~/model/User";
import { userSocketMap } from "~/socket/createSocket";
import { Message, MessageContent } from "~/socket/types/Message";
import { validateMessageData } from "./validate";

const sendPrivateMessage = (io: IOServer, socket: Socket, data: Message) => {
  const user = socket.data.user as User;
  log(
    `User: ${user.nickname} sent a private message to user ${JSON.stringify(data.recipients)}`,
  );
  const validatedData = validateMessageData(data);

  if (typeof validatedData.recipients === "string") {
    const recipient = userSocketMap[validatedData.recipients];
    log("sendPrivateMessage");

    if (recipient)
      io.to([socket.id, recipient.socketId]).emit("message:emit", socket.data);
  }
};

export { sendPrivateMessage };

