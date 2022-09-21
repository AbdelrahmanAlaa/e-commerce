const express = require("express");
const { protect } = require("../controller/authUsersController");
const {
  createCategory,
  deleteCategory,
  getCategory,
  resizeImage,
  updateCategory,
  uploadImage,
} = require("../controller/categoryController");
const router = express.Router();
const {
  createCategoryValidator,
  deleteCategoryValidator,
  getCategoryValidator,
  updateCategoryValidator,
} = require("../utils/validation/validationCategory");
const subCategoryRoutes = require("./subCategoryRoutes");

router
  .route("/createCategory")
  .post(
    protect,
    uploadImage,
    resizeImage,
    createCategoryValidator,
    createCategory
  );

router.route("/getCategory").get(getCategory);

router
  .route("/deleteCategory/:id")
  .delete(deleteCategoryValidator, deleteCategory);

router
  .route("/updateCategory/:id")
  .patch(uploadImage, resizeImage, updateCategoryValidator, updateCategory);

router.use("/:categoryId/subCategory", subCategoryRoutes);
module.exports = router;
