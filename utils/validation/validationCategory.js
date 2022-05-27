const {
  Category,
  validateCategory,
  validateUpdate,
} = require("../../models/categoryModel");
const asyncError = require("../../middleware/asyncError");
exports.validateCategory = async (req, res, next) => {
  try {
    // validate name and check is created before or not
    const category = await Category.findOne({ name: req.body.name });
    if (category)
      return res
        .status(404)
        .send({ message: "this name is exactly created.. " });
    await validateCategory(req.body);

    next();
  } catch (error) {
    if (error)
      return res.status(400).json({
        status: "false",
        message: error.details[0].message,
      });
  }
};

exports.validateUpdate = async (req, res, next) => {
  try {
    await validateUpdate(req.body);
    next();
  } catch (error) {
    if (error)
      return res.status(400).json({
        status: "false",
        message: error.details[0].message,
      });
  }
};
