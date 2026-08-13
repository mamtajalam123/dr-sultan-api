
import { Router } from "express";

import ContactController from "../controllers/contact.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

const contactController =
  new ContactController();

// ==========================================
// PUBLIC ROUTE
// WEBSITE CONTACT FORM
// ==========================================

// POST /api/contacts
router.post(
  "/",
  contactController.create.bind(
    contactController
  )
);

// ==========================================
// ADMIN PROTECTED ROUTES
// ==========================================

router.use(authMiddleware);

// ==========================================
// GET ALL CONTACTS
// GET /api/contacts
// ==========================================

router.get(
  "/",
  contactController.getAll.bind(
    contactController
  )
);

// ==========================================
// GET CONTACT BY ID
// GET /api/contacts/:id
// ==========================================

router.get(
  "/:id",
  contactController.getById.bind(
    contactController
  )
);

// ==========================================
// UPDATE CONTACT
// PUT /api/contacts/:id
// ==========================================

router.put(
  "/:id",
  contactController.update.bind(
    contactController
  )
);

// ==========================================
// UPDATE STATUS
// PATCH /api/contacts/:id/status
// ==========================================

router.patch(
  "/:id/status",
  contactController.updateStatus.bind(
    contactController
  )
);

// ==========================================
// DELETE CONTACT
// DELETE /api/contacts/:id
// ==========================================

router.delete(
  "/:id",
  contactController.remove.bind(
    contactController
  )
);

export default router;