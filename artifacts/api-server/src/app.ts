import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import path from "path";
import { existsSync, mkdirSync } from "fs";
import router from "./routes/index.js";
import { logger } from "./lib/logger.js";

const GALLERY_DIR = path.resolve("data/gallery");
if (!existsSync(GALLERY_DIR)) mkdirSync(GALLERY_DIR, { recursive: true });

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return { id: req.id, method: req.method, url: req.url?.split("?")[0] };
      },
      res(res) {
        return { statusCode: res.statusCode };
      },
    },
  }),
);

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Serve uploaded gallery images as static files
app.use("/api/gallery/image", express.static(GALLERY_DIR));

app.use("/api", router);

export default app;
