import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

// ==========================================
// ROUTES
// ==========================================

import authRoutes from "./routes/auth.routes";
import appointmentRoutes from "./routes/appointment.routes";
import contactRoutes from "./routes/contact.routes";
import serviceRoutes from "./routes/service.routes";
import serviceCategoryRoutes from "./routes/service-category.routes";
import designationRoutes from "./routes/designation.routes";
import teamRoutes from "./routes/team.routes";
import feedbackRoutes from "./routes/feedback.routes";
import galleryRoutes from "./routes/gallery.routes";

// ==========================================
// APP
// ==========================================

const app = express();

// ==========================================
// CORS
// ==========================================

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// ==========================================
// BODY PARSERS
// ==========================================

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

// ==========================================
// COOKIE PARSER
// ==========================================

app.use(cookieParser());

// ==========================================
// STATIC UPLOADS
// ==========================================
//
// IMPORTANT:
//
// upload.middleware.ts uses:
//
// process.cwd()/uploads
//
// Therefore server.ts must use
// the SAME location.
//
// ==========================================

const uploadsPath = path.resolve(
  process.cwd(),
  "uploads"
);

const feedbackUploadsPath =
  path.join(
    uploadsPath,
    "feedback"
  );

const galleryUploadsPath =
  path.join(
    uploadsPath,
    "gallery"
  );

const serviceUploadsPath =
  path.join(
    uploadsPath,
    "services"
  );

const teamUploadsPath =
  path.join(
    uploadsPath,
    "team"
  );

// ==========================================
// UPLOAD DEBUG
// ==========================================

console.log(
  "=========================================="
);

console.log(
  "UPLOAD CONFIGURATION"
);

console.log(
  "CURRENT WORKING DIRECTORY:",
  process.cwd()
);

console.log(
  "UPLOADS DIRECTORY:",
  uploadsPath
);

console.log(
  "FEEDBACK IMAGES:",
  feedbackUploadsPath
);

console.log(
  "SERVICE IMAGES:",
  serviceUploadsPath
);

console.log(
  "TEAM IMAGES:",
  teamUploadsPath
);

console.log(
  "GALLERY IMAGES:",
  galleryUploadsPath
);

console.log(
  "=========================================="
);

// ==========================================
// SERVE UPLOADS
// ==========================================
//
// URL:
//
// http://localhost:5000/uploads/feedback/test.jpg
//
// Physical file:
//
// <project>/uploads/feedback/test.jpg
//
// ==========================================

app.use(
  "/uploads",
  express.static(
    uploadsPath
  )
);

// ==========================================
// UPLOAD HEALTH CHECK
// ==========================================

app.get(
  "/uploads/health",
  (_req, res) => {
    return res.status(200).json({
      success: true,
      message:
        "Uploads directory is available.",
      uploadsPath,
    });
  }
);

// ==========================================
// API ROUTES
// ==========================================

// ==========================================
// AUTH
// ==========================================

app.use(
  "/api/auth",
  authRoutes
);

// ==========================================
// APPOINTMENTS
// ==========================================

app.use(
  "/api/appointments",
  appointmentRoutes
);

// ==========================================
// CONTACTS
// ==========================================

app.use(
  "/api/contacts",
  contactRoutes
);

// ==========================================
// SERVICE CATEGORIES
// ==========================================

app.use(
  "/api/service-categories",
  serviceCategoryRoutes
);

// ==========================================
// SERVICES
// ==========================================

app.use(
  "/api/services",
  serviceRoutes
);

// ==========================================
// DESIGNATIONS
// ==========================================

app.use(
  "/api/designations",
  designationRoutes
);

// ==========================================
// TEAM
// ==========================================

app.use(
  "/api/teams",
  teamRoutes
);

// ==========================================
// FEEDBACK
// ==========================================

app.use(
  "/api/feedback",
  feedbackRoutes
);

// ==========================================
// GALLERY
// ==========================================

app.use(
  "/api/gallery",
  galleryRoutes
);

// ==========================================
// ROOT HEALTH CHECK
// ==========================================

app.get(
  "/",
  (_req, res) => {
    return res.status(200).json({
      success: true,
      message: "API Running",
    });
  }
);

// ==========================================
// API HEALTH CHECK
// ==========================================

app.get(
  "/api/health",
  (_req, res) => {
    return res.status(200).json({
      success: true,
      status: "200 OK",
      message:
        "API is healthy",
    });
  }
);

// ==========================================
// 404 HANDLER
// ==========================================

app.use(
  (_req, res) => {
    return res.status(404).json({
      success: false,
      status:
        "404 Not Found",
      message:
        "API endpoint not found.",
    });
  }
);

// ==========================================
// START SERVER
// ==========================================

const PORT =
  Number(process.env.PORT) || 5000;

app.listen(
  PORT,
  () => {
    console.log(
      "=========================================="
    );

    console.log(
      `Server running on port ${PORT}`
    );

    console.log(
      `API: http://localhost:${PORT}`
    );

    console.log(
      `Uploads: http://localhost:${PORT}/uploads`
    );

    console.log(
      `Feedback images: http://localhost:${PORT}/uploads/feedback`
    );

    console.log(
      `Service images: http://localhost:${PORT}/uploads/services`
    );

    console.log(
      `Team images: http://localhost:${PORT}/uploads/team`
    );

    console.log(
      `Gallery images: http://localhost:${PORT}/uploads/gallery`
    );

    console.log(
      `Feedback API: http://localhost:${PORT}/api/feedback`
    );

    console.log(
      `Gallery API: http://localhost:${PORT}/api/gallery`
    );

    console.log(
      `Service Categories: http://localhost:${PORT}/api/service-categories`
    );

    console.log(
      "=========================================="
    );
  }
);