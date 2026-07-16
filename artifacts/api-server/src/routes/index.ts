import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import adminRouter from "./admin.js";
import contentRouter from "./content.js";
import galleryRouter from "./gallery.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use(adminRouter);
router.use(contentRouter);
router.use(galleryRouter);

export default router;
