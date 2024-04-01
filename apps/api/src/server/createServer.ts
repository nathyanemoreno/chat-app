import { json, urlencoded } from "body-parser";
import cors from "cors";
import express, { Express } from "express";
import pino from "pino-http";
import { router } from "./router";

export const logger = pino({
  customLogLevel: function (req, res, err) {
    if (res.statusCode >= 400 && res.statusCode < 500) {
      return "warn";
    } else if (res.statusCode >= 500 || err) {
      return "error";
    } else if (res.statusCode >= 300 && res.statusCode < 400) {
      return "silent";
    }
    return "info";
  },
  customErrorMessage: function (req, res) {
    return req.method + ": request errored with status code: " + res.statusCode;
  },
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
});

export const createServer: () => Express = () => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(urlencoded({ extended: true }))
    .use(logger)
    .use(json())
    .use(cors())
    .use(router)
    .get("/healthz", (req, res) => {
      return res.json({ ok: true });
    });

  return app;
};
