const express = require("express");
const {
  createSubCategory,
  deleteSubCategory,
  getSubCategory,
  getSubCategoryByID,
  updateSubCategory,
} = require("../controller/subCategoryController");
// const authUser = require("../controller/authUsersController");
const router = express.Router({ mergeParams: true });

const {
  createSubCategoryValidator,
  deleteSubCategoryValidator,
  getSubCategoryValidator,
  updateSubCategoryValidator,
} = require("../utils/validation/validationSubCategory");

const { protect, allowedTo } = require("../controller/authUsersController");

router
  .route("/")
  .post(
    protect,
    allowedTo("admin", "manger"),
    createSubCategoryValidator,
    createSubCategory
  )
  .get(getSubCategory);

router
  .route("/:id")
  .get(getSubCategoryValidator, getSubCategoryByID)
  .patch(
    protect,
    allowedTo("admin", "manger"),
    updateSubCategoryValidator,
    updateSubCategory
  )
  .delete(
    protect,
    allowedTo("admin"),
    deleteSubCategoryValidator,
    deleteSubCategory
  );

module.exports = router;
