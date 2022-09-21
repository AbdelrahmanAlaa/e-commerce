const multer = require("multer");

exports.uploadSingleImage = (filedName) => {
  const multerStorage = multer.memoryStorage();

  const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
  return upload.single(filedName);
};

// const fileStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null,'images/category');
//   },
// });

// const fileFilter= (req, file, cb) => {
//   const ext = file.mimetype.split('/')[1];
//   const filename = `category-${uuidv4()}.${ext}`
//   cb(null,filename)
// };

// const fileFilterMulter= (req, file, cb) => {
//   if (files.mimetype.startsWith("image")) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// exports.uploadSingleImage = multer({
//   storage: fileStorage,
//   fileFilter: fileFilter,
// }).single("imageCover");

// exports.uploadMultiImage = multer({
//   storage: fileStorage,
//   fileFilterMulter: fileFilterMulter,
// }).fields([
//   {
//     name: "images",
//     maxCount: "7",
//   },
//   {
//     name:"imageCover",
//     maxCount:"2"
//   }

// ]);
