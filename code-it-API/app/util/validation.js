/**
 * This file contains the validation for different schema.
 * Uses the Joi library to validate data.
 * For example, the usernames and password requirements are verified
 * here.
 */

const Joi = require("joi");

const registerValidation = (data) => {
  const register_schema = Joi.object({
    username: Joi.string().alphanum().min(5).max(64).required(),
    password: Joi.string().min(6).max(255).required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org"] } })
      .required(),
  });
  return register_schema.validate(data);
};

const loginValidation = (data) => {
  const login_schema = Joi.object({
    username: Joi.string().alphanum().min(5).max(64),
    password: Joi.string().min(6).max(255).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org"] } }),
  });
  return login_schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
