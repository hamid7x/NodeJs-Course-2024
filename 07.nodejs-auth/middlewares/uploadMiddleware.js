const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  fileName: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + "-" + path(file.originalname));
  },
});

const checkFileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("not image, please upload only images"));
  }
};

module.exports = multer({
  storage: storage,
  fileFilter: checkFileFilter,
  limits: {
    fileSize: 5 * 1024 *1024
  },
});
