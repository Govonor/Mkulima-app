const multer = require('multer');
const path = require('path');

// Set storage options for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define the destination folder where uploaded files will be stored
    cb(null, 'uploads/'); // 'uploads' folder in your root directory
  },
  filename: (req, file, cb) => {
    // Define the naming convention for the uploaded files
    cb(
      null,
      `${Date.now()}-${file.fieldname}${path.extname(file.originalname)}`
    );
  },
});

// Create the multer instance with the defined storage configuration
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // Limit file size to 5MB
  },
  fileFilter: (req, file, cb) => {
    // Accept only specific file types (images, PDF, etc.)
    const filetypes = /jpeg|jpg|png|gif|pdf/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true); // File is accepted
    } else {
      cb('Error: Only images and PDFs are allowed'); // Reject file if it doesn't match the allowed types
    }
  },
});

// Middleware to handle single file uploads (for example: 'image')
const uploadSingle = (fieldName) => {
  return upload.single(fieldName);
};

// Middleware to handle multiple file uploads (for example: 'images')
const uploadMultiple = (fieldName, maxFiles = 10) => {
  return upload.array(fieldName, maxFiles); // Specify the max number of files allowed
};

module.exports = {
  uploadSingle,
  uploadMultiple,
};
