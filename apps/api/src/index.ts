import { log } from "@repo/logger";
import http from "http";
import { createServer } from "~/server/createServer";
import { createSocket } from "~/socket/createSocket";

const app = createServer(); //Express server instance
const server = http.createServer(app); //Http server instance
createSocket(server); //Socket server instance

const port = process.env.API_PORT || 4001;

server.listen(port, () => {
  log(`api running on ${port}`);
});
