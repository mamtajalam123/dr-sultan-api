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
  controller.getAll.bind(controller)
);




// ==========================================
// GET SINGLE FEEDBACK
// GET /api/feedback/:id
// ==========================================

router.get(
  "/:id",
  controller.getById.bind(controller)
);





// ==========================================
// ADMIN ROUTES
// ==========================================


// ==========================================
// CREATE FEEDBACK
// POST /api/feedback
//
// multipart/form-data
//
// field:
// patientImage
// ==========================================

router.post(
  "/",
  authMiddleware,
  uploadFeedback.single(
    "patientImage"
  ),
  controller.create.bind(controller)
);





// ==========================================
// UPDATE FEEDBACK
// PUT /api/feedback/:id
//
// multipart/form-data
//
// field:
// patientImage
// ==========================================

router.put(
  "/:id",
  authMiddleware,
  uploadFeedback.single(
    "patientImage"
  ),
  controller.update.bind(controller)
);





// ==========================================
// UPDATE STATUS
// PATCH /api/feedback/:id/status
//
// body:
//
// {
//    "status":"Approved"
// }
//
// ==========================================

router.patch(
  "/:id/status",
  authMiddleware,
  controller.updateStatus.bind(controller)
);





// ==========================================
// DELETE FEEDBACK
// DELETE /api/feedback/:id
// ==========================================

router.delete(
  "/:id",
  authMiddleware,
  controller.delete.bind(controller)
);





export default router;