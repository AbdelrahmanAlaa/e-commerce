const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  createAddress,
  removeAddress,
  getAllAddresses,
} = require("../controller/addressController");

const {
  createAddressValidator,
} = require("../utils/validation/validationAddress");

const { protect, allowedTo } = require("../controller/authUsersController");

router.post(
  "/",
  protect,
  allowedTo("user"),
  createAddressValidator,
  createAddress
);
router.delete("/:addressId", protect, allowedTo("user"), removeAddress);

router.get("/", protect, allowedTo("user"), getAllAddresses);
module.exports = router;
