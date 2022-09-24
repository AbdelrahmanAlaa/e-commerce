const express = require("express");
const { protect, allowedTo } = require("../controller/authUsersController");
const {
  getCategoryById,
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
  .route("/")
  .get(getCategory)
  .post(
    protect,
    allowedTo("admin", "manger"),
    uploadImage,
    resizeImage,
    createCategoryValidator,
    createCategory
  );

router
  .route("/:id")
  .get(getCategoryValidator, getCategoryById)
  .delete(protect, allowedTo("admin"), deleteCategoryValidator, deleteCategory)
  .patch(
    protect,
    allowedTo("admin", "manger"),
    uploadImage,
    resizeImage,
    updateCategoryValidator,
    updateCategory
  );

router.use("/:categoryId/subCategory", subCategoryRoutes);
module.exports = router;
