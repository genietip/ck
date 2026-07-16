import { Router } from "express";
import { signToken } from "../middlewares/auth.js";

const router = Router();

const ADMIN_USER = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASS = process.env.ADMIN_PASSWORD || "changeme";

router.post("/admin/login", (req, res) => {
  const { username, password } = req.body as { username: string; password: string };
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    res.json({ token: signToken() });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

export default router;
