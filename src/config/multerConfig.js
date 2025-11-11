const multer = require("multer");
const path = require("path");

// --- Configuración para Subir Imágenes ---

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/images");
  },
  filename: (req, file, cb) => {
    // Generar un nombre de archivo único (timestamp + nombre original)
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const imageFileFilter = (req, file, cb) => {
  // Aceptar solo archivos de imagen (png, jpg, jpeg, gif)
  const filetypes = /jpeg|jpg|png|gif/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(
    new Error(
      "Error: ¡Solo se admiten archivos de imagen (jpeg, jpg, png, gif)!"
    )
  );
};

const uploadImage = multer({
  storage: imageStorage,
  fileFilter: imageFileFilter,
  limits: { fileSize: 1024 * 1024 * 5 }, // Límite de 5MB
});

// --- Configuración para Subir Archivos PDF ---

const pdfStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/pdfs");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const pdfFileFilter = (req, file, cb) => {
  // Aceptar solo archivos PDF
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Error: ¡Solo se admiten archivos PDF!"));
  }
};

const uploadPdf = multer({
  storage: pdfStorage,
  fileFilter: pdfFileFilter,
  limits: { fileSize: 1024 * 1024 * 10 }, // Límite de 10MB
});

module.exports = {
  uploadImage,
  uploadPdf,
};
