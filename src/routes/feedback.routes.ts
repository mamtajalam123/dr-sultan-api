import { Router } from "express";
import { FeedbackController } from "../controllers/feedback.controller";
// import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

const controller = new FeedbackController();

// ==========================================
// PUBLIC ROUTES
// ==========================================

// Get All Feedback
router.get("/", controller.getAll);

// Get Feedback By ID
router.get("/:id", controller.getById);

// ==========================================
// PROTECTED ROUTES
// ==========================================

// Uncomment if you want authentication
// router.use(authMiddleware);

// Create Feedback
router.post("/", controller.create);

// Update Feedback
router.put("/:id", controller.update);

// Delete Feedback
router.delete("/:id", controller.remove);

export default router;