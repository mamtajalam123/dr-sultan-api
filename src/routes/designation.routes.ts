import { Router } from "express";
import { DesignationController } from "../controllers/designation.controller";
// import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

const controller = new DesignationController();

// ==========================================
// PUBLIC ROUTES
// ==========================================

// Get All Designations
router.get("/", controller.getAll);

// Get Designation By ID
router.get("/:id", controller.getById);

// ==========================================
// PROTECTED ROUTES
// ==========================================

// Uncomment if using JWT Authentication
// router.use(authMiddleware);

// Create Designation
router.post("/", controller.create);

// Update Designation
router.put("/:id", controller.update);

// Delete Designation
router.delete("/:id", controller.remove);

export default router;