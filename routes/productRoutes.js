const express = require("express");
const {
  createProduct,
  deleteProduct,
  getProductById,
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

const { protect, allowedTo } = require("../controller/authUsersController");

router
  .route("/")
  .post(
    protect,
    allowedTo("admin", "manger"),
    uploadImage,
    resizeImage,
    createProductValidators,
    createProduct
  )
  .get(getProduct);

router
  .route("/:id")
  .delete(protect, allowedTo("admin"), deleteProductValidator, deleteProduct)
  .patch(
    protect,
    allowedTo("admin", "manger"),
    updateProductValidator,
    updateProduct
  )
  .get(getProductValidator, getProductById);

// router.use("/:productId/subProduct", subProductRoutes);
module.exports = router;
