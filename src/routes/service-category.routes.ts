import { Router } from "express";
import { ServiceCategoryController } from "../controllers/service-category.controller";
// import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

const controller = new ServiceCategoryController();

// ==========================================
// PUBLIC ROUTES
// ==========================================

// Get All Categories
router.get("/", controller.getAll);

// Get Category By ID
router.get("/:id", controller.getById);

// ==========================================
// PROTECTED ROUTES
// ==========================================

// Uncomment if using JWT Authentication
// router.use(authMiddleware);

// Create Category
router.post("/", controller.create);

// Update Category
router.put("/:id", controller.update);

// Delete Category
router.delete("/:id", controller.remove);

export default router;