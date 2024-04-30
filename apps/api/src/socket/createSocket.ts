import { log } from "@repo/logger";
import { Server } from "http";
import { Server as IOServer, Socket } from "socket.io";

const onConnection = (io: IOServer, socket: Socket) => {
  log("initial transport " + socket.conn.transport.name); // prints "polling"

  socket.on("disconnect", () => {
    console.log(`User ${socket.id} disconnected`);
    log(`Connected users: ${io.sockets.sockets.size}`);
  });

  socket.on("error", (err) => {
    if (err && err.message === "unauthorized event") {
      socket.disconnect();
    }
  });
};

const createSocket = (server: Server) => {
  const io = new IOServer(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket: Socket) => onConnection(io, socket));

  log(`socket server running over port ${process.env.API_PORT}`);
};

export { createSocket };
