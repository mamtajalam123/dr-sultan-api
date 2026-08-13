import { Router } from "express";

import { GalleryController } from "../controllers/gallery.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { uploadGalleryImage } from "../middleware/upload.middleware";

// ==========================================
// ROUTER
// ==========================================

const router = Router();

// ==========================================
// CONTROLLER
// ==========================================

const controller =
  new GalleryController();

// ==========================================
// PUBLIC ROUTES
// ==========================================

// ------------------------------------------
// GET ALL GALLERY
// GET /api/gallery
// ------------------------------------------

router.get(
  "/",
  controller.getAll.bind(controller)
);

// ------------------------------------------
// GET GALLERY BY ID
// GET /api/gallery/:id
// ------------------------------------------

router.get(
  "/:id",
  controller.getById.bind(controller)
);

// ==========================================
// PROTECTED ROUTES
// ==========================================

// ------------------------------------------
// CREATE GALLERY
// POST /api/gallery
//
// Auth required
// Multipart/form-data
// Image field: image
// ------------------------------------------

router.post(
  "/",
  authMiddleware,
  uploadGalleryImage.single("image"),
  controller.create.bind(controller)
);

// ------------------------------------------
// UPDATE GALLERY
// PUT /api/gallery/:id
//
// Auth required
// Multipart/form-data
// Image field: image
// ------------------------------------------

router.put(
  "/:id",
  authMiddleware,
  uploadGalleryImage.single("image"),
  controller.update.bind(controller)
);

// ------------------------------------------
// DELETE GALLERY
// DELETE /api/gallery/:id
//
// Auth required
// ------------------------------------------

router.delete(
  "/:id",
  authMiddleware,
  controller.remove.bind(controller)
);

// ==========================================
// EXPORT
// ==========================================

export default router;