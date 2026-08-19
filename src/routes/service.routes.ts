import { Router } from "express";

import {
  ServiceController
} from "../controllers/service.controller";

import {
  authMiddleware
} from "../middleware/auth.middleware";

import {
  uploadServiceImage,
} from "../middleware/upload.middleware";


const router = Router();


const controller =
  new ServiceController();




// ==========================================
// PUBLIC ROUTES
// ==========================================


// GET ALL SERVICES
// GET /api/services

router.get(
  "/",
  controller.getAll
);




// GET SERVICE BY SLUG
// GET /api/services/slug/:slug

router.get(
  "/slug/:slug",
  controller.getBySlug
);




// GET SERVICE BY ID
// GET /api/services/:id

router.get(
  "/:id",
  controller.getById
);






// ==========================================
// ADMIN ROUTES
// ==========================================


// CREATE SERVICE

router.post(

  "/",

  authMiddleware,

  uploadServiceImage.single(
    "image"
  ),

  controller.create

);






// UPDATE SERVICE

router.put(

  "/:id",

  authMiddleware,

  uploadServiceImage.single(
    "image"
  ),

  controller.update

);






// DELETE SERVICE

router.delete(

  "/:id",

  authMiddleware,

  controller.remove

);





export default router;