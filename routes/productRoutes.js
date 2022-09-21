const express = require("express");
const {
  createProduct,
  deleteProduct,
  getOne,
  getProduct,
  resizeImage,
  updateProduct,
  uploadImage,
} = require("../controller/productController");
const router = express.Router();
const {
  createProductValidators,
  deleteProductValidator,
  getProductValidator,
  updateProductValidator,
} = require("../utils/validation/validationProduct");

router
  .route("/")
  .post(uploadImage, resizeImage, createProductValidators, createProduct)
  .get(getProductValidator, getProduct);

router
  .route("/:id")
  .delete(deleteProductValidator, deleteProduct)
  .patch(updateProductValidator, updateProduct)
  .get(getOne);

// router.use("/:productId/subProduct", subProductRoutes);
module.exports = router;
