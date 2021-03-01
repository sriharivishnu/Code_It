/**
 * This file contains the validation for different schema.
 * Uses the Joi library to validate data.
 * For example, the usernames and password requirements are verified
 * here.
 */

const Joi = require("joi");

/**
 * Common schemas
 */

//---
const get_username_schema = () => {
  return Joi.string()
    .regex(/^[a-zA-Z0-9._]*$/)
    .message("Username can only contain alphanumeric characters, underscores, and periods")
    .min(5)
    .max(64);
};

const get_email_schema = () => {
  return Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org", "io"] } })
    .min(5)
    .max(255);
};

const get_password_schema = () => {
  return Joi.string()
    .regex(/^(?=.*[A-Z])(?=.*[!@#$&*%_\-+.])(?=.*[0-9])(?=.*[a-z]).{6,}$/)
    .message(
      "Password must contain 1 upper case letter, 1 lower case letter, 1 special character and be at least six characters in length."
    )
    .min(6)
    .max(255);
};

// Register fields validation
const registerValidation = (data) => {
  const register_schema = Joi.object({
    username: get_username_schema().required(),
    password: get_password_schema().required(),
    email: get_email_schema().required(),
  });
  return register_schema.validate(data);
};

//Login fields validation
const loginValidation = (data) => {
  const login_schema = Joi.object({
    username: get_username_schema(),
    password: get_password_schema().required(),
    email: get_email_schema(),
  });
  return login_schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
