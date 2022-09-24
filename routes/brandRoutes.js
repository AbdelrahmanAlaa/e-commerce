const express = require("express");
const router = express.Router();
const {
  createBrand,
  deleteBrand,
  getBrandById,
  getBrand,
  resizeImage,
  updateBrand,
  uploadImage,
} = require("../controller/brandController");

const {
  createBrandValidator,
  deleteBrandValidator,
  getBrandValidator,
  updateBrandValidator,
} = require("../utils/validation/validationBrand");

const { protect, allowedTo } = require("../controller/authUsersController");

// const brandRoutes = require("./subBrandRoutes");

router
  .route("/")
  .get(getBrand)
  .post(
    protect,
    allowedTo("admin", "manger"),
    uploadImage,
    resizeImage,
    createBrandValidator,
    createBrand
  );
router
  .route("/:id")
  .get(getBrandValidator, getBrandById)
  .delete(protect, allowedTo("admin"), deleteBrandValidator, deleteBrand)
  .patch(
    protect,
    allowedTo("admin", "manger"),
    updateBrandValidator,
    uploadImage,
    resizeImage,
    updateBrand
  );

// router.use("/:brandId/subBrand", brandRoutes);
module.exports = router;
