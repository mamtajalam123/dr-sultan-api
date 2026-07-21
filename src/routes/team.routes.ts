import { Router } from "express";
import { TeamController } from "../controllers/team.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

const controller = new TeamController();

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

// Get All Team Members (Frontend)
router.get("/", controller.getAll);

// Get Team Member By ID (Frontend)
router.get("/:id", controller.getById);

/*
|--------------------------------------------------------------------------
| Protected Routes (Admin)
|--------------------------------------------------------------------------
*/

// Create Team Member
router.post(
  "/",
  authMiddleware,
  controller.create
);

// Update Team Member
router.put(
  "/:id",
  authMiddleware,
  controller.update
);

// Delete Team Member
router.delete(
  "/:id",
  authMiddleware,
  controller.remove
);

export default router;