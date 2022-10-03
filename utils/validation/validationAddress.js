const { check, body } = require("express-validator");
const validatorMiddleware = require("../../middleware/validatorMiddleware");

exports.createAddressValidator = [
  check("alias").notEmpty().withMessage(" alias of address required"),
  check("street").notEmpty().withMessage(" street of address required"),
  check("phone").notEmpty().withMessage(" phone of address required"),
  check("city").notEmpty().withMessage(" city of address required"),

  validatorMiddleware,
];
