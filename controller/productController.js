const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");

const factory = require("./handlersFactory");
const { Product } = require("../models/productModel");
exports.validReq = (req, res, next) => {
  if (!req.body.categoryId) req.body.category = req.params.categoryId;
  next();
};

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadImage = upload.fields([
  { name: "imageCover", maximum: 1 },
  { name: "images", maximum: 5 },
]);

exports.resizeImage = async (req, res, next) => {
  if (req.files.imageCover) {
    const filename = `product-${uuidv4()}-imageCover .jpeg`;
    await sharp(req.files.imageCover[0].buffer)
      .resize(2000, 1333)
      .toFormat("jpeg")
      .jpeg({ quality: 95 })
      .toFile(`images/products/${filename}`);

    req.body.imageCover = filename;
  }

  if (req.files.images) {
    req.body.images = [];
    await Promise.all(
      req.files.images.map(async (imag, index) => {
        const filename = `product-${uuidv4()}-${index + 1}.jpeg`;
        await sharp(imag.buffer)
          .resize(500, 500)
          .toFormat("jpeg")
          .jpeg({ quality: 95 })
          .toFile(`images/products/${filename}`);

        req.body.images.push(filename);
      })
    );
  }

  next();
};

exports.createProduct = factory.createOne(Product);

exports.getProductById = factory.getOne(Product);

exports.getProduct = factory.getAll(Product, "Products");

exports.updateProduct = factory.update(Product);

exports.deleteProduct = factory.deleteOne(Product);
