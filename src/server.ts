import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import fs from "fs";

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
    origin:[
      "http://localhost:3000",
      "http://localhost:3001"
    ],
    credentials:true
  })
);


// ==========================================
// BODY PARSER
// ==========================================

app.use(
  express.json()
);


app.use(
  express.urlencoded({
    extended:true,
  })
);


// ==========================================
// COOKIE
// ==========================================

app.use(
  cookieParser()
);



// ==========================================
// UPLOAD PATH
// ==========================================


const uploadsPath =
  path.resolve(
    process.cwd(),
    "uploads"
  );



// Create uploads folder automatically

if(
  !fs.existsSync(
    uploadsPath
  )
){

  fs.mkdirSync(
    uploadsPath,
    {
      recursive:true,
    }
  );

}



const feedbackUploadsPath =
  path.join(
    uploadsPath,
    "feedback"
  );
app.use(
 "/uploads",
 express.static(
   path.join(__dirname,"../uploads")
 )
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




// Create sub folders

[
  feedbackUploadsPath,
  galleryUploadsPath,
  serviceUploadsPath,
  teamUploadsPath

].forEach(
  (folder)=>{

    if(
      !fs.existsSync(folder)
    ){

      fs.mkdirSync(
        folder,
        {
          recursive:true,
        }
      );

    }

  }
);




// ==========================================
// DEBUG
// ==========================================


console.log(
  "=================================="
);

console.log(
  "UPLOAD CONFIG"
);


console.log(
  "ROOT:",
  process.cwd()
);


console.log(
  "UPLOAD:",
  uploadsPath
);


console.log(
  "FEEDBACK:",
  feedbackUploadsPath
);


console.log(
  "GALLERY:",
  galleryUploadsPath
);


console.log(
  "SERVICE:",
  serviceUploadsPath
);


console.log(
  "TEAM:",
  teamUploadsPath
);


console.log(
  "=================================="
);




// ==========================================
// STATIC FILE SERVER
// ==========================================


app.use(
  "/uploads",
  express.static(
    uploadsPath,
    {

      extensions:[
        "jpg",
        "jpeg",
        "png",
        "webp"
      ]

    }
  )
);




// ==========================================
// IMAGE TEST ROUTE
// ==========================================


app.get(
  "/uploads/health",
  (_req,res)=>{


    res.status(200).json({

      success:true,

      message:
        "Uploads working",

      path:
        uploadsPath

    });


  }
);





// ==========================================
// API ROUTES
// ==========================================



app.use(
  "/api/auth",
  authRoutes
);



app.use(
  "/api/appointments",
  appointmentRoutes
);



app.use(
  "/api/contacts",
  contactRoutes
);



app.use(
  "/api/service-categories",
  serviceCategoryRoutes
);



app.use(
  "/api/services",
  serviceRoutes
);



app.use(
  "/api/designations",
  designationRoutes
);



app.use(
  "/api/teams",
  teamRoutes
);



app.use(
  "/api/feedback",
  feedbackRoutes
);



app.use(
  "/api/gallery",
  galleryRoutes
);





// ==========================================
// HEALTH
// ==========================================


app.get(
  "/",
  (_req,res)=>{


    res.status(200).json({

      success:true,

      message:
        "API Running"

    });


  }
);



app.get(
  "/api/health",
  (_req,res)=>{


    res.status(200).json({

      success:true,

      status:
        "200 OK",

      message:
        "API Healthy"

    });


  }
);





// ==========================================
// 404
// ==========================================


app.use(
  (_req,res)=>{


    res.status(404).json({

      success:false,

      message:
        "API endpoint not found"

    });


  }
);





// ==========================================
// SERVER
// ==========================================


const PORT =
  Number(
    process.env.PORT
  ) || 5000;



app.listen(
  PORT,
  ()=>{


    console.log(
      "=================================="
    );


    console.log(
      `Server running : ${PORT}`
    );


    console.log(
      `API:
      http://localhost:${PORT}`
    );


    console.log(
      `Uploads:
      http://localhost:${PORT}/uploads`
    );


    console.log(
      `Feedback Images:
      http://localhost:${PORT}/uploads/feedback`
    );


    console.log(
      `Gallery Images:
      http://localhost:${PORT}/uploads/gallery`
    );


    console.log(
      `Service Images:
      http://localhost:${PORT}/uploads/services`
    );


    console.log(
      `Team Images:
      http://localhost:${PORT}/uploads/team`
    );


    console.log(
      "=================================="
    );


  }
);