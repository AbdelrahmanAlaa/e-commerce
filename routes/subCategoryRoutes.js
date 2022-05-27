const express = require("express");
const subCategory = require("../controller/subCategoryController");
// const authUser = require("../controller/authUsersController");
// const admin = require("../middleware/admin");
const router = express.Router({ mergeParams: true });
// const multerConfig = require("../middleware/multer");
const validation = require("../utils/validation/validationSubCategory");
router
  .route("/")
  .post(validation.ValidateCreateSubCategory, subCategory.createSubCategory)
  .get(subCategory.getSubCategory);

router
  .route("/:id")
  .get(subCategory.getSubCategoryByID)
  .patch(validation.validateUpdateSubCategory, subCategory.updateSubCategory)
  .delete(subCategory.deleteSubCategory);

module.exports = router;
