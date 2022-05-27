const express = require("express");
const product = require("../controller/productController");
const router = express.Router();
const validate = require("../utils/validation/validationProduct");
// const subProductRoutes = require("./subProductRoutes");
router
  .route("/")
  .post(validate.validateProduct, product.createProduct)
  .get(product.getProduct);

router.route("/:id").delete(product.deleteProduct);
// .patch(validate.validateUpdateProduct, product.updateProduct);

// router.use("/:productId/subProduct", subProductRoutes);
module.exports = router;
