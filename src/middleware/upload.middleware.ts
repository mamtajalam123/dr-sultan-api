import multer from "multer";
import path from "path";
import fs from "fs";

// =====================================================
// BASE UPLOAD DIRECTORY
// =====================================================

const uploadBaseDir = path.resolve(
  process.cwd(),
  "uploads"
);

// =====================================================
// ENSURE BASE UPLOAD DIRECTORY EXISTS
// =====================================================

if (!fs.existsSync(uploadBaseDir)) {
  fs.mkdirSync(uploadBaseDir, {
    recursive: true,
  });
}

// =====================================================
// CREATE UPLOAD DIRECTORY
// =====================================================

const createUploadDir = (
  folder: string
): string => {
  const uploadDir = path.join(
    uploadBaseDir,
    folder
  );

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, {
      recursive: true,
    });

    console.log(
      "UPLOAD DIRECTORY CREATED:",
      uploadDir
    );
  }

  return uploadDir;
};

// =====================================================
// ALLOWED IMAGE TYPES
// =====================================================

const allowedMimeTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
];

// =====================================================
// IMAGE FILE FILTER
// =====================================================

const fileFilter: multer.Options["fileFilter"] = (
  _req,
  file,
  cb
) => {
  console.log(
    "================================="
  );

  console.log(
    "UPLOAD FILE"
  );

  console.log(
    "FIELD NAME:",
    file.fieldname
  );

  console.log(
    "ORIGINAL NAME:",
    file.originalname
  );

  console.log(
    "MIME TYPE:",
    file.mimetype
  );

  console.log(
    "================================="
  );

  if (
    allowedMimeTypes.includes(
      file.mimetype
    )
  ) {
    cb(null, true);
    return;
  }

  cb(
    new Error(
      "Only JPG, JPEG, PNG, WEBP and GIF images are allowed."
    )
  );
};

// =====================================================
// CREATE STORAGE
// =====================================================

const createStorage = (
  folder: string,
  prefix: string
): multer.StorageEngine => {
  const uploadDir =
    createUploadDir(folder);

  return multer.diskStorage({
    // =================================================
    // DESTINATION
    // =================================================

    destination: (
      _req,
      _file,
      cb
    ) => {
      console.log(
        "UPLOAD DESTINATION:",
        uploadDir
      );

      cb(
        null,
        uploadDir
      );
    },

    // =================================================
    // FILE NAME
    // =================================================

    filename: (
      _req,
      file,
      cb
    ) => {
      const extension =
        path
          .extname(
            file.originalname
          )
          .toLowerCase();

      const filename =
        `${prefix}-${Date.now()}-${Math.round(
          Math.random() * 1e9
        )}${extension}`;

      console.log(
        "GENERATED FILE NAME:",
        filename
      );

      console.log(
        "FULL FILE PATH:",
        path.join(
          uploadDir,
          filename
        )
      );

      cb(
        null,
        filename
      );
    },
  });
};

// =====================================================
// COMMON UPLOAD LIMIT
// =====================================================

const uploadLimits: multer.Options["limits"] = {
  fileSize:
    5 * 1024 * 1024,
};

// =====================================================
// FEEDBACK IMAGE UPLOAD
//
// FormData field:
// patientImage
//
// Physical folder:
// uploads/feedback/
//
// Database value:
// /uploads/feedback/filename.jpg
// =====================================================

const feedbackStorage =
  createStorage(
    "feedback",
    "feedback"
  );

export const uploadFeedback =
  multer({
    storage:
      feedbackStorage,

    fileFilter,

    limits:
      uploadLimits,
  });

// =====================================================
// SERVICE IMAGE UPLOAD
//
// Physical folder:
// uploads/services/
// =====================================================

const serviceStorage =
  createStorage(
    "services",
    "service"
  );

export const uploadServiceImage =
  multer({
    storage:
      serviceStorage,

    fileFilter,

    limits:
      uploadLimits,
  });

// =====================================================
// TEAM IMAGE UPLOAD
//
// Physical folder:
// uploads/team/
// =====================================================

const teamStorage =
  createStorage(
    "team",
    "team"
  );

export const uploadTeamImage =
  multer({
    storage:
      teamStorage,

    fileFilter,

    limits:
      uploadLimits,
  });

// =====================================================
// GALLERY IMAGE UPLOAD
//
// Physical folder:
// uploads/gallery/
// =====================================================

const galleryStorage =
  createStorage(
    "gallery",
    "gallery"
  );

export const uploadGalleryImage =
  multer({
    storage:
      galleryStorage,

    fileFilter,

    limits:
      uploadLimits,
  });