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
// ERROR MIDDLEWARE
// ==========================================

import {
  errorHandler,
} from "./middleware/error.middleware";



// ==========================================
// APP
// ==========================================

const app = express();



// ==========================================
// MIDDLEWARES
// ==========================================


app.use(
  cors({
    origin:
      "http://localhost:3000",

    credentials:true,
  })
);



app.use(
  express.json()
);



app.use(
  express.urlencoded({
    extended:true,
  })
);



app.use(
  cookieParser()
);



// ==========================================
// STATIC UPLOADS
// ==========================================


const uploadsPath =
  path.join(
    process.cwd(),
    "uploads"
  );



app.use(
  "/uploads",
  express.static(
    uploadsPath
  )
);




// ==========================================
// API ROUTES
// ==========================================


// AUTH

app.use(
  "/api/auth",
  authRoutes
);



// APPOINTMENTS

app.use(
  "/api/appointments",
  appointmentRoutes
);



// CONTACT

app.use(
  "/api/contacts",
  contactRoutes
);



// SERVICE CATEGORY

app.use(
  "/api/service-categories",
  serviceCategoryRoutes
);



// SERVICES

app.use(
  "/api/services",
  serviceRoutes
);



// DESIGNATIONS

app.use(
  "/api/designations",
  designationRoutes
);



// TEAM

app.use(
  "/api/teams",
  teamRoutes
);



// FEEDBACK

app.use(
  "/api/feedback",
  feedbackRoutes
);



// GALLERY

app.use(
  "/api/gallery",
  galleryRoutes
);




// ==========================================
// ROOT TEST
// ==========================================


app.get(
  "/",
  (_req,res)=>{

    res.status(200).json({

      success:true,

      message:
        "Dr Sultan API Running"

    });

  }
);



// ==========================================
// API HEALTH
// ==========================================


app.get(
  "/api/health",
  (_req,res)=>{

    res.status(200).json({

      success:true,

      message:
        "API Healthy"

    });

  }
);




// ==========================================
// 404 ROUTE
// ==========================================


app.use(
  (
    req,
    res
  )=>{

    res.status(404).json({

      success:false,

      message:
        `Route not found: ${req.originalUrl}`

    });

  }
);




// ==========================================
// GLOBAL ERROR
// ==========================================


app.use(
  errorHandler
);



export default app;