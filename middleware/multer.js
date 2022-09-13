const multer = require("multer");

const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
});

const fileFilter= (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const fileFilterMulter= (req, file, cb) => {
  if (files.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

exports.uploadSingleImage = multer({
  storage: fileStorage,
  fileFilter: fileFilter,
}).single("imageCover");

exports.uploadMultiImage = multer({
  storage: fileStorage,
  fileFilterMulter: fileFilterMulter,
}).fields([
  {
    name: "images",
    maxCount: "7",
  },
  {
    name:"imageCover",
    maxCount:"2"
  }

]);
