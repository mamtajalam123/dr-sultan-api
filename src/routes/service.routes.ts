import { Router } from "express";
import { ServiceController } from "../controllers/service.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

const controller = new ServiceController();

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

router.get("/", controller.getAll);

router.get("/:id", controller.getById);

/*
|--------------------------------------------------------------------------
| Protected Routes (Admin)
|--------------------------------------------------------------------------
*/

router.post(
  "/",
  authMiddleware,
  controller.create
);

router.put(
  "/:id",
  authMiddleware,
  controller.update
);

router.delete(
  "/:id",
  authMiddleware,
  controller.remove
);

export default router;