const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const asyncHandler = require("express-async-handler");
const crypto = require("crypto");
require("dotenv").config("../");

const ApiError = require("../utils/apiError");
const sendEmail = require("./../middleware/email");
const { User, createRandomPassword } = require("../models/userModel");

const createToken = (userId) => {
  return jwt.sign({ _id: userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });
};

exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  //   check token is send to headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res
      .status(401)
      .json({ message: "access denied , no token provided" });
  }
  // verify token (no change happen or expired )
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  console.log(decoded);

  // check if user exists
  const checkUser = await User.findById(decoded._id);
  if (!checkUser) {
    return res
      .status(401)
      .json({ message: "this user not be longe available" });
  }

  // check if user change his password after token created
  if (checkUser.passwordChangedAt) {
    const passChangeTime = parseInt(
      checkUser.passwordChangedAt.getTime() / 1000,
      10
    );
    if (passChangeTime > checkUser.passwordChangedAt) {
      return next(
        new ApiError(
          "This Email changed his password , please login again ",
          401
        )
      );
    }
    console.log(passChangeTime);
  }

  req.user = decoded;

  next();
});

exports.register = asyncHandler(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const token = createToken(user._id);

  res.header("Authorization", token).status(200).json({
    status: "success",
    message: "successfully register",
    user,
    token,
  });
});

exports.login = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new ApiError("Incorrect in your email or password", 400));
  }

  const token = createToken(user._id);

  res
    .header("Authorization", token)
    .status(200)
    .json({
      status: "true",
      message: "successfully login",
      token,
      user: _.pick(user, ["_id", "name", "email"]),
    });
});

exports.forgetPassword = asyncHandler(async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user)
    res.status(404).json({
      status: "false",
      message: "this email is not found ..!",
    });

  const restToken = createRandomPassword();
  user.passwordRestToken = passwordRestToken;
  user.passwordRestExpire = passwordRestExpire;

  await user.save();

  const restURL = `${restToken}`;

  const status = `Forgot Your password ? Submit a PATCH request with  your new password and 
    passwordConfirm to : <br>  your code : ${restURL} .<>  If you didn't forget your password , \n please ignore this email! `;

  try {
    await sendEmail({
      email: user.email,
      subject: `your password reset if you didn't forget your password please ignore this email`,
      status,
    });
    res.status(200).json({
      status: "true",
      message: "Request was a success",
      message: "validation message sent to your email",
    });
  } catch (err) {
    user.passwordRestToken = undefined;
    user.passwordRestExpires = undefined;

    return res
      .status(500)
      .json("there was an error sending the email , try again later !!");
  }
});

exports.restPassword = asyncHandler(async (req, res) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordRestToken: hashedToken,
    passwordRestExpire: { $gt: Date.now() },
  });
  if (!user)
    return res.status(400).json({
      status: "false",
      message: "Token is invalid or expired ..",
    });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);

  user.confirmPassword = undefined;
  user.passwordRestToken = undefined;
  user.passwordExpires = undefined;

  await user.save();
  res.status(200).json({
    status: "success",
    message: "successfully updated your password",
    user,
  });
});

exports.getAllUsers = asyncHandler(async (req, res) => {
  const user = await User.find();
  res.status(200).json({
    status: "true",
    user,
  });
});
exports.getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user)
    res.status(404).json({
      status: "false",
      message: "this user is not found ... ",
    });
  res.status(200).json({
    status: "true",
    user,
  });
});
