import { Router } from "express";
import { AppointmentController } from "../controllers/appointment.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();
const appointmentController = new AppointmentController();

// ✅ Public route
router.post("/", appointmentController.create);

// 🔒 Protected admin routes
router.get("/", authMiddleware, appointmentController.getAll);

router.get("/:id", authMiddleware, appointmentController.getById);

router.put("/:id", authMiddleware, appointmentController.update);

router.patch(
  "/:id/status",
  authMiddleware,
  appointmentController.updateStatus
);

router.patch(
  "/:id/payment",
  authMiddleware,
  appointmentController.updatePayment
);

router.delete(
  "/:id",
  authMiddleware,
  appointmentController.remove
);

export default router;