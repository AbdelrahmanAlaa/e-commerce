const express = require("express");
const category = require("../controller/categoryController");
const router = express.Router();
const validate = require("../utils/validation/validationCategory");
const subCategoryRoutes = require("./subCategoryRoutes");
router
  .route("/creatCategory")
  .post(validate.validateCategory, category.creatCategory);

router.route("/getCategory").get(category.getCategory);

router.route("/deleteCategory/:id").delete(category.deleteCategory);

router
  .route("/updateCategory/:id")
  .patch(validate.validateUpdate, category.updateCategory);

router.use("/:categoryId/subCategory", subCategoryRoutes);
module.exports = router;
