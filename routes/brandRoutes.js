const express = require("express");
const router = express.Router();
const {
  createBrand,
  deleteBrand,
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

// const brandRoutes = require("./subBrandRoutes");

router
  .route("/")
  .get(getBrand)
  .post(uploadImage, resizeImage, createBrandValidator, createBrand);
router
  .route("/:id")
  .delete(deleteBrand)
  .patch(uploadImage, resizeImage, updateBrand);

// router.use("/:brandId/subBrand", brandRoutes);
module.exports = router;
