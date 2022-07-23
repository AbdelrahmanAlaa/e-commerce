const express = require("express");
const brand = require("../controller/brandController");
const router = express.Router();
const validate = require("../utils/validation/validationBrand");
// const brandRoutes = require("./subBrandRoutes");
router
  .route("/")
  .post(validate.validateCreatBrand, brand.creatBrand)
  .get(brand.getBrand);

router
  .route("/:id")
  .delete(brand.deleteBrand)
  .patch(validate.validateUpdate, brand.updateBrand);

// router.use("/:brandId/subBrand", brandRoutes);
module.exports = router;
