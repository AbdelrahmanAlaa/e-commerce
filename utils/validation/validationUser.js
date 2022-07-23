const {
  validateUser,
  validateLogin,
  validateRestPassword,
} = require("../../models/userModel");

exports.validateRegister = async (req, res, next) => {
  try {
    await validateUser(req.body);
    next();
  } catch (error) {
    if (error)
      return res.status(400).json({
        status: "false",
        message: error.details[0].message,
      });
  }
};
exports.validateLogin = async (req, res, next) => {
  try {
    await validateLogin(req.body);
    next();
  } catch (error) {
    if (error)
      return res.status(400).json({
        status: "false",
        message: error.details[0].message,
      });
  }
};

exports.validateRestPassword = async (req, res, next) => {
  try {
    await validateRestPassword(req.body);
    next();
  } catch (error) {
    if (error)
      return res.status(400).json({
        status: "false",
        message: error.details[0].message,
      });
  }
};
