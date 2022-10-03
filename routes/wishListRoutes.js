const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  addProductToWishList,
  removeProductFromWishList,
  getAllProductsFromWishList,
} = require("../controller/wishListController");

const {
  createWishListValidator,
} = require("../utils/validation/validationWishList");

const { protect, allowedTo } = require("../controller/authUsersController");

router.post(
  "/",
  protect,
  allowedTo("user"),
  createWishListValidator,
  addProductToWishList
);
router.delete(
  "/:productId",
  protect,
  allowedTo("user"),
  removeProductFromWishList
);

router.get("/", protect, allowedTo("user"), getAllProductsFromWishList);
module.exports = router;
