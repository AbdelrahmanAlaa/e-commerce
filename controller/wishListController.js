const asyncHandler = require("express-async-handler");

const ApiFeatures = require("../middleware/apiFeatures");
const factory = require("./handlersFactory");

const { User } = require("../models/userModel");
exports.addProductToWishList = asyncHandler(async (req, res, next) => {
  const wishList = await User.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: { wishList: req.body.productId },
    },
    {
      new: true,
    }
  );

  res.status(200).json({
    message: wishList,
  });
});

exports.removeProductFromWishList = asyncHandler(async (req, res, next) => {
  const wishList = await User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { wishList: req.params.productId },
    },
    {
      new: true,
    }
  );

  res.status(200).json({
    status: "true",
    message: "successfully delete products form wishlist",
  });
});

exports.getAllProductsFromWishList = asyncHandler(async (req, res, next) => {
  console.log(req.user._id);
  const user = await User.findById(req.user._id).populate("wishList");
  res.status(200).json({
    status: "true",
    result: wishList.length,
    message: user.wishList,
  });
});
