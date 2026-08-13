import { Router } from "express";

import {
  FeedbackController,
} from "../controllers/feedback.controller";

import {
  authMiddleware,
} from "../middleware/auth.middleware";

import {
  uploadFeedback,
} from "../middleware/upload.middleware";

const router = Router();

// ==========================================
// CONTROLLER
// ==========================================

const controller =
  new FeedbackController();

// ==========================================
// PUBLIC ROUTES
// ==========================================

// ==========================================
// GET ALL FEEDBACK
// GET /api/feedback
// ==========================================

router.get(
  "/",
  controller.getAll
);

// ==========================================
// GET SINGLE FEEDBACK
// GET /api/feedback/:id
// ==========================================

router.get(
  "/:id",
  controller.getById
);

// ==========================================
// PROTECTED ADMIN ROUTES
// ==========================================

// ==========================================
// CREATE FEEDBACK
// POST /api/feedback
//
// Content-Type:
// multipart/form-data
//
// FormData field:
// patientImage
// ==========================================

router.post(
  "/",
  authMiddleware,
  uploadFeedback.single(
    "patientImage"
  ),
  controller.create
);

// ==========================================
// UPDATE FEEDBACK
// PUT /api/feedback/:id
//
// Content-Type:
// multipart/form-data
//
// FormData field:
// patientImage
// ==========================================

router.put(
  "/:id",
  authMiddleware,
  uploadFeedback.single(
    "patientImage"
  ),
  controller.update
);

// ==========================================
// UPDATE STATUS
// PATCH /api/feedback/:id/status
//
// Content-Type:
// application/json
//
// Body:
// {
//   "status": "Approved"
// }
// ==========================================

router.patch(
  "/:id/status",
  authMiddleware,
  controller.updateStatus
);

// ==========================================
// DELETE FEEDBACK
// DELETE /api/feedback/:id
// ==========================================

router.delete(
  "/:id",
  authMiddleware,
  controller.delete
);

// ==========================================
// EXPORT
// ==========================================

export default router;