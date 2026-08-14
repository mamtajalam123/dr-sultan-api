import { Router } from "express";

import {
  FeedbackController,
} from "../controllers/feedback.controller";

import {
  uploadFeedback,
} from "../middleware/upload.middleware";


const router = Router();


const controller =
  new FeedbackController();



// ==========================================
// GET ALL
// ==========================================

router.get(
  "/",
  controller.getAll
);



// ==========================================
// GET BY ID
// ==========================================

router.get(
  "/:id",
  controller.getById
);



// ==========================================
// CREATE
// ==========================================

router.post(
  "/",
  uploadFeedback.single(
    "patientImage"
  ),
  controller.create
);



// ==========================================
// UPDATE
// ==========================================

router.put(
  "/:id",
  uploadFeedback.single(
    "patientImage"
  ),
  controller.update
);



// ==========================================
// UPDATE STATUS
// ==========================================

router.patch(
  "/:id/status",
  controller.updateStatus
);



// ==========================================
// DELETE
// ==========================================

router.delete(
  "/:id",
  controller.delete
);


export default router;