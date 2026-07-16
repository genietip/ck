import { Router } from "express";
import { readFileSync, writeFileSync, existsSync } from "fs";
import path from "path";
import { requireAuth } from "../middlewares/auth.js";

const router = Router();
const DATA_FILE = path.resolve("data/content.json");

function readContent() {
  if (!existsSync(DATA_FILE)) return {};
  return JSON.parse(readFileSync(DATA_FILE, "utf-8"));
}

router.get("/content", (_req, res) => {
  res.json(readContent());
});

router.put("/content", requireAuth, (req, res) => {
  const current = readContent();
  const updated = { ...current, ...req.body };
  writeFileSync(DATA_FILE, JSON.stringify(updated, null, 2));
  res.json(updated);
});

export default router;
