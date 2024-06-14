const { check } = require("express-validator");

exports.signUpValidation = [
  check("name", "Name is required").not().isEmpty(),
  check("password", "Password is required").isLength({ min: 6, max: 8 }),
  check("username", "username must be of length between 4 to 10").isLength({ min: 4, max: 10 }),
  // check("isVerified").isBoolean().withMessage("isVerified must be a boolean value")
];

exports.loginValidation = [
  
  check("password", "Entere a password of min 6 length ").isLength({
    min: 6,
    max: 118,
  }),
];

exports.updateValidation = [
  check("phone", "Please Enter a valid Phone Number").isMobilePhone(),
  check("password", "Password is required").isLength({ min: 6, max: 8 }),

];
