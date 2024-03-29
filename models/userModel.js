const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  phone: {
    type: Number,
  },
  email: {
    type: String,
  },
  profileImage: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "admin", "manger"],
    default: "user",
  },
  wishList: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Product",
    },
  ],
  addresses: [
    {
      id: { type: mongoose.Schema.ObjectId },
      alias: String,
      street: String,
      city: String,
      phone: String,
      state: String,
    },
  ],
  passwordRestToken: String,
  passwordChangedAt: Date,
  passwordRestExpire: String,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  // hash password
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.model("User", userSchema);

exports.createRandomPassword = function () {
  const restToken = crypto.randomBytes(3).toString("hex");

  passwordRestToken = crypto
    .createHash("sha256")
    .update(restToken)
    .digest("hex");

  passwordRestExpire = Date.now() + 10 * 60 * 1000;

  return restToken;
};

exports.User = User;
exports.schemaUser = userSchema;
