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
router
  .route("/")
  .post(createSubCategoryValidator, createSubCategory)
  .get(getSubCategory);

router
  .route("/:id")
  .get(getSubCategoryValidator, getSubCategoryByID)
  .patch(updateSubCategoryValidator, updateSubCategory)
  .delete(deleteSubCategoryValidator, deleteSubCategory);

module.exports = router;
