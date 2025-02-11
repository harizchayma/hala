const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/images/");  // Specify the folder where images will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);  // Rename the image with a timestamp to avoid name conflicts
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
