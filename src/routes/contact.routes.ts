import { Router } from "express";
import ContactController from "../controllers/contact.controller";
import { authMiddleware } from "../middleware/auth.middleware";


const router = Router();

const contactController = new ContactController();

// ==========================================
// PUBLIC ROUTE
// Website Contact Form
// ==========================================

router.post(
  "/",
  contactController.create
);

// ==========================================
// ADMIN ROUTES (Protected)
// ==========================================

router.use(authMiddleware);

// Get All Contacts
router.get(
  "/",
  contactController.getAll
);

// Get Contact By ID
router.get("/:id", contactController.getById);

// Update Contact
router.put(
  "/:id",
  contactController.update
);

// Update Status
router.patch(
  "/:id/status",
  contactController.updateStatus
);

// Delete Contact
router.delete(
  "/:id",
  contactController.remove
);

export default router;