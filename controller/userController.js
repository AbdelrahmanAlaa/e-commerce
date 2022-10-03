const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const ApiFeatures = require("../middleware/apiFeatures");
const factory = require("./handlersFactory");
const { uploadSingleImage } = require("../middleware/multer");
const { User } = require("../models/userModel");
// for admin
exports.uploadImage = uploadSingleImage("profileImage");

exports.resizeImage = factory.resizeImage("user", 600, 600);

exports.createUser = factory.createOne(User);

exports.getUser = asyncHandler(async (req, res) => {
  const contDocuments = await User.countDocuments();

  const apiFeatures = new ApiFeatures(req.query, User.find())
    .sort()
    .paginate(contDocuments)
    .limitFields()
    .filter()
    .search();
  const { mongooseQuery, paginationResult } = apiFeatures;
  const user = await mongooseQuery;
  res.status(200).json({ length: user.length, paginationResult, user });
});

exports.getUserById = factory.getOne(User);

exports.updateUser = asyncHandler(async (req, res) => {
  const documents = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      profileImage: req.body.profileImage,
      country: req.body.country,
      role: req.body.role,
    },
    {
      new: true,
    }
  );
  res.status(200).json({ status: "true", documents });
});

exports.updateUserPassword = asyncHandler(async (req, res) => {
  const documents = await User.findByIdAndUpdate(
    req.params.id,
    {
      password: await bcrypt.hash(req.body.password, 12),
      passwordChangedAt: Date.now(),
    },
    {
      new: true,
    }
  );
  res.status(200).json({ status: "true", documents });
});

exports.deleteUser = factory.deleteOne(User);

// form users :

exports.getLoggedUserData = asyncHandler(async (req, res, next) => {
  req.params.id = req.user._id;
  console.log(req.params.id);
  next();
});

exports.updateLoggedUser = asyncHandler(async (req, res, next) => {
  const documents = await User.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      country: req.body.country,
    },
    {
      new: true,
    }
  );
  res.status(200).json({ status: "true", documents });
});
exports.updateLoggedUserPassword = asyncHandler(async (req, res, next) => {
  const documents = await User.findByIdAndUpdate(
    req.user._id,
    {
      password: await bcrypt.hash(req.body.password, 12),
      passwordChangedAt: Date.now(),
    },
    {
      new: true,
    }
  );
  res.status(200).json({ status: "true", documents });
});
