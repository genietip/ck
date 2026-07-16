import { Router } from "express";
import multer from "multer";
import { readdirSync, unlinkSync, existsSync, mkdirSync } from "fs";
import path from "path";
import { requireAuth } from "../middlewares/auth.js";

const router = Router();
const GALLERY_DIR = path.resolve("data/gallery");

if (!existsSync(GALLERY_DIR)) mkdirSync(GALLERY_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, GALLERY_DIR),
  filename: (_req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only images allowed"));
  },
});

router.get("/gallery", (_req, res) => {
  const files = readdirSync(GALLERY_DIR).filter((f) =>
    /\.(jpg|jpeg|png|webp|gif)$/i.test(f)
  );
  res.json(files.map((f) => ({ filename: f, url: `/api/gallery/image/${f}` })));
});

router.post("/gallery/upload", requireAuth, upload.array("photos", 20), (req, res) => {
  const files = (req.files as Express.Multer.File[]) || [];
  res.json(files.map((f) => ({ filename: f.filename, url: `/api/gallery/image/${f.filename}` })));
});

router.delete("/gallery/:filename", requireAuth, (req, res) => {
  const file = path.join(GALLERY_DIR, path.basename(req.params.filename));
  if (existsSync(file)) unlinkSync(file);
  res.json({ ok: true });
});

export default router;
