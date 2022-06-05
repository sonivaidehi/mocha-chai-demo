/**
 * userValidation.js
 * @description :: validate each post and put request as per user model
 */

const joi = require('joi');

/** validation keys and properties of user */
exports.schemaKeys = joi.object({
  firstName: joi.string().required().min(3).max(16),
  lastName: joi.string().required().min(3).max(16),
  email: joi.string().email().required(),
  mobileNo: joi.string().length(14).pattern(/^([+]\d{2})?-\d{10}$/).required(),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
});
