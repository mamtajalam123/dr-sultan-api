import { Router } from "express";

import { TeamController } from "../controllers/team.controller";

import {
  uploadTeamImage,
} from "../middleware/upload.middleware";

const router = Router();


// ======================================================
// CREATE TEAM MEMBER
// POST /api/teams
// ======================================================

router.post(
  "/",
  uploadTeamImage.single("image"),
  TeamController.create
);



// ======================================================
// GET ALL TEAM MEMBERS
// GET /api/teams
// ======================================================

router.get(
  "/",
  TeamController.getAll
);



// ======================================================
// GET TEAM MEMBER BY ID
// GET /api/teams/:id
// ======================================================

router.get(
  "/:id",
  TeamController.getById
);



// ======================================================
// UPDATE TEAM MEMBER
// PUT /api/teams/:id
// ======================================================

router.put(
  "/:id",
  uploadTeamImage.single("image"),
  TeamController.update
);



// ======================================================
// DELETE TEAM MEMBER
// DELETE /api/teams/:id
// ======================================================

router.delete(
  "/:id",
  TeamController.delete
);


export default router;