import { Router } from "express";
import { GalleryController } from "../controllers/gallery.controller";
// import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

const controller = new GalleryController();

// ==========================================
// PUBLIC ROUTES
// ==========================================

// Get All Gallery
router.get("/", controller.getAll);

// Get Gallery By ID
router.get("/:id", controller.getById);

// ==========================================
// PROTECTED ROUTES
// ==========================================

// Uncomment if using JWT Authentication
// router.use(authMiddleware);

// Create Gallery
router.post("/", controller.create);

// Update Gallery
router.put("/:id", controller.update);

// Delete Gallery
router.delete("/:id", controller.remove);

export default router;