import { Router } from "express";

import {
  getAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from "../controllers/appointment.controller";

import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.get("/", authenticate, getAppointments);

router.get("/:id", authenticate, getAppointmentById);

router.post("/", authenticate, createAppointment);

router.put("/:id", authenticate, updateAppointment);

router.delete("/:id", authenticate, deleteAppointment);

export default router;