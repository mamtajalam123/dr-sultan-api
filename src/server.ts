import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes";
import appointmentRoutes from "./routes/appointment.routes";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});