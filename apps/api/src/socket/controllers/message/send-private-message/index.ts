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

const sendMultiplePrivateMessage = (
  io: IOServer,
  socket: Socket,
  data: Message,
) => {
  const user = socket.data.user as User;
  log(
    `User: ${user.nickname} sent a private message to users ${JSON.stringify(data.recipients)}`,
  );

  const validatedData = validateMessageData(data);

  if (typeof validatedData.recipients !== "string") {
    // TODO: send message to unavailable users
    const recipientsId = validatedData.recipients.map(
      (id) => userSocketMap[id]?.socketId,
    );
    log("sendMultiplePrivateMessage");

    if (recipientsId)
      io.to([socket.id, ...recipientsId]).emit("message:emit", {
        text: data.text,
      } as MessageContent);
  }
};

export { sendPrivateMessage, sendMultiplePrivateMessage };
