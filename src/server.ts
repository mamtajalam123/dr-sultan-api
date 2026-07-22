import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes";
import appointmentRoutes from "./routes/appointment.routes";
import contactRoutes from "./routes/contact.routes";
import serviceRoutes from "./routes/service.routes";
import serviceCategoryRoutes from "./routes/service-category.routes";
import teamRoutes from "./routes/team.routes";
import designationRoutes from "./routes/designation.routes";
import feedbackRoutes from "./routes/feedback.routes";
import galleryRoutes from "./routes/gallery.routes";

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

app.use("/api/service-categories", serviceCategoryRoutes);

app.use("/api/designations", designationRoutes);


app.use("/api/teams", teamRoutes);

app.use("/api/feedback", feedbackRoutes);

app.use("/api/gallery", galleryRoutes);

// ======================================

app.listen(5000, () => {
  console.log("Server running on port 5000");
});