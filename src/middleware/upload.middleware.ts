import multer from "multer";
import path from "path";
import fs from "fs";



// =====================================================
// BASE UPLOAD DIRECTORY
// =====================================================

const uploadBaseDir =
  path.resolve(
    process.cwd(),
    "uploads"
  );



// =====================================================
// CREATE BASE DIRECTORY
// =====================================================

if(
  !fs.existsSync(
    uploadBaseDir
  )
){

  fs.mkdirSync(
    uploadBaseDir,
    {
      recursive:true
    }
  );

}



// =====================================================
// CREATE FOLDER
// =====================================================


const createUploadDir = (
  folder:string
)=>{


  const dir =
    path.join(
      uploadBaseDir,
      folder
    );


  if(
    !fs.existsSync(dir)
  ){

    fs.mkdirSync(
      dir,
      {
        recursive:true
      }
    );

  }


  return dir;


};





// =====================================================
// IMAGE TYPES
// =====================================================


const allowedMimeTypes = [

  "image/jpeg",

  "image/png",

  "image/webp",

  "image/gif"

];







// =====================================================
// FILE FILTER
// =====================================================


const fileFilter:multer.Options["fileFilter"] =
(
 req,
 file,
 cb
)=>{


  console.log(
    "UPLOAD:",
    file.fieldname,
    file.originalname,
    file.mimetype
  );



  if(
    allowedMimeTypes.includes(
      file.mimetype
    )
  ){

    cb(
      null,
      true
    );

  }
  else{


    cb(
      new Error(
        "Invalid image format"
      )
    );


  }


};







// =====================================================
// STORAGE
// =====================================================


const createStorage = (
 folder:string,
 prefix:string
)=>{


 const uploadDir =
 createUploadDir(folder);



 return multer.diskStorage({



 destination(
  req,
  file,
  cb
 ){

  console.log(
    "UPLOAD DIR:",
    uploadDir
  );


  cb(
    null,
    uploadDir
  );


 },





 filename(
  req,
  file,
  cb
 ){


  const ext =
    path.extname(
      file.originalname
    )
    .toLowerCase();



  const filename =
    `${prefix}-${Date.now()}-${Math.floor(
      Math.random()*100000
    )}${ext}`;



  console.log(
    "FILE:",
    filename
  );



  cb(
    null,
    filename
  );


 }



 });


};








// =====================================================
// LIMIT
// =====================================================


const uploadLimits = {

 fileSize:
   5 * 1024 * 1024

};








// =====================================================
// FEEDBACK
// =====================================================


export const uploadFeedback =

multer({

 storage:
 createStorage(
   "feedback",
   "feedback"
 ),

 fileFilter,

 limits:
 uploadLimits

});







// =====================================================
// SERVICE
// =====================================================


export const uploadServiceImage =

multer({

 storage:
 createStorage(
   "services",
   "service"
 ),

 fileFilter,

 limits:
 uploadLimits

});







// =====================================================
// TEAM
// =====================================================


export const uploadTeamImage =

multer({

 storage:
 createStorage(
   "team",
   "team"
 ),

 fileFilter,

 limits:
 uploadLimits

});







// =====================================================
// GALLERY
// =====================================================


export const uploadGalleryImage =

multer({

 storage:
 createStorage(
   "gallery",
   "gallery"
 ),

 fileFilter,

 limits:
 uploadLimits

});