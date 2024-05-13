import { log } from "@repo/logger";
import { Server as IOServer, Socket } from "socket.io";
import { sendMultiplePrivateMessage, sendPrivateMessage } from "~/socket/controllers/message/send-private-message";
import { Message } from "~/socket/types/Message";

const onPrivateMessage = (io: IOServer, socket: Socket) => {
  socket.on("message:send", (data: Message) => {
    log("onPrivateMessage");
    sendPrivateMessage(io, socket, data);
  });
};

const onMultiplePrivateMessage = (io: IOServer, socket: Socket) => {
  socket.on("message:send-multiple", (data: Message) => {
    log("onMultiplePrivateMessage");
    sendMultiplePrivateMessage(io, socket, data);
  });
};

export { onPrivateMessage, onMultiplePrivateMessage };
