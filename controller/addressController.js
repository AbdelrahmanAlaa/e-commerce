const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const { User } = require("../models/userModel");

exports.createAddress = asyncHandler(async (req, res, next) => {
  const address = await User.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: { addresses: req.body },
    },
    {
      new: true,
    }
  );

  res.status(200).json({
    message: address,
  });
});

exports.removeAddress = asyncHandler(async (req, res, next) => {
  console.log(req.params.addressId);
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { addresses: { _id: req.params.addressId } },
    },
    {
      new: true,
    }
  );

  res.status(200).json({
    status: "true",
    message: "successfully delete this address ",
  });
});

exports.getAllAddresses = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).populate("addresses");
  res.status(200).json({
    status: "true",
    result: user.addresses.length,
    message: user.addresses,
  });
});
