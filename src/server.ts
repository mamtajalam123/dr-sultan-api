import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes";
import appointmentRoutes from "./routes/appointment.routes";
import contactRoutes from "./routes/contact.routes";
import serviceRoutes from "./routes/service.routes";
import teamRoutes from "./routes/team.routes";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// ======================================
// API Routes
// ======================================

app.use("/api/auth", authRoutes);

app.use("/api/appointments", appointmentRoutes);

app.use("/api/contacts", contactRoutes);

app.use("/api/services", serviceRoutes);

app.use("/api/teams", teamRoutes);

// ======================================

app.listen(5000, () => {
  console.log("Server running on port 5000");
});