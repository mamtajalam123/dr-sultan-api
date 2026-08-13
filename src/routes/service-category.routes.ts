import { Router } from "express";

import { ServiceCategoryController } from "../controllers/service-category.controller";

import { authMiddleware } from "../middleware/auth.middleware";


const router = Router();


const controller =
  new ServiceCategoryController();





/*
|--------------------------------------------------------------------------
| PUBLIC ROUTES
|--------------------------------------------------------------------------
*/


// Get all categories
// Frontend dropdown/filter

router.get(
  "/",
  controller.getAll
);




// Get category by id

router.get(
  "/:id",
  controller.getById
);







/*
|--------------------------------------------------------------------------
| ADMIN PROTECTED ROUTES
|--------------------------------------------------------------------------
*/


router.use(authMiddleware);




// Create category

router.post(
  "/",
  controller.create
);




// Update category

router.put(
  "/:id",
  controller.update
);




// Delete category

router.delete(
  "/:id",
  controller.remove
);



export default router;