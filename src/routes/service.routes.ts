import { Router } from "express";
import { ServiceController } from "../controllers/service.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { uploadServiceImage } from "../middleware/upload.middleware";

const router = Router();
const controller = new ServiceController();


// ==========================================
// PUBLIC ROUTES
// ==========================================

// Get all services
router.get(
  "/",
  controller.getAll
);

// Get service by id
router.get(
  "/:id",
  controller.getById
);


// ==========================================
// ADMIN ROUTES
// ==========================================

// Create service
router.post(
  "/",
  authMiddleware,
  uploadServiceImage.single("image"),
  controller.create
);

// Update service
router.put(
  "/:id",
  authMiddleware,
  uploadServiceImage.single("image"),
  controller.update
);

// Delete service
router.delete(
  "/:id",
  authMiddleware,
  controller.remove
);

export default router;