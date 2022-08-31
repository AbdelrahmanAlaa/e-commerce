const {
  Brand,
  validateBrand,
  validateUpdateBrand,
} = require("../../models/brandModel");

exports.validateCreateBrand = async (req, res, next) => {
  try {
    // validate name and check is created before or not
    const brand = await Brand.findOne({ name: req.body.name });
    if (brand)
      return res
        .status(404)
        .send({ message: "this name is exactly created.. " });
    // validate before register
    await validateBrand(req.body);
    next();
  } catch (error) {
    if (error)
      await res.status(400).json({
        status: "false",
        message: error.details[0].message,
      });
  }
};

exports.validateUpdate = async (req, res, next) => {
  try {
    await validateUpdateBrand(req.body);
    next();
  } catch (error) {
    if (error)
      await res.status(400).json({
        status: "false",
        message: error.details[0].message,
      });
  }
};
