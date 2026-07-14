import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import appointmentRoutes from "./routes/appointment.routes";

import { errorHandler } from "./middleware/error.middleware";

const app = express();

/* Middlewares */
app.use(cors());
app.use(express.json());

/* Routes */
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);

/* 404 Route */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/* Global Error Handler */
app.use(errorHandler);

export default app;