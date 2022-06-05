/**
 * authController.js
 * @description :: exports authentication methods
 */

const User = require('../model/user');
const dbService = require('../utils/dbService');
const userSchemaKey = require('../utils/validation/userValidation');
const validation = require('../utils/validateRequest');
const authConstant = require('../constants/authConstant');
const common = require('../utils/common');

/**
 * @description : user registration 
 * @param {Object} req : request for register
 * @param {Object} res : response for register
 * @return {Object} : response for register {status, message, data}
 */
const register = async (req,res) =>{
  try {
    if (!req.body){
      return res.badRequest({ message : 'Request body can not be empty.' });
    }

    if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.mobileNo){
      return res.badRequest({ message : 'Insufficient request parameters!' });
    }
    
    let validateRequest = validation.validateParamsWithJoi(
      req.body,
      userSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message :  `Invalid values in parameters, ${validateRequest.message}` });
    } 
    
    const data = new User({
      ...req.body,
      userType: authConstant.USER_TYPES.Admin
    });

    let checkUniqueFields = await common.checkUniqueFieldsInDatabase(User,[ 'mobileNo', 'email' ],data,'REGISTER');
    if (checkUniqueFields.isDuplicate){
      return res.validationError({ message : `${checkUniqueFields.value} already exists.Unique ${checkUniqueFields.field} are allowed.` });
    }

    const result = await dbService.create(User,data);
    return res.success({ data :result });
  } catch (error) {
    return res.internalServerError({ data:error.message }); 
  }  
};

module.exports = { register, };