const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  
  //INITIALIZE ERRORS
  let errors = {}

  //INITIALIZE THE STRINGS TO BE EMPTY FIRST
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  
  //CHECK IF THE EMAIL IS A VALID EMAIL
  if(!Validator.isEmail(data.email)) {
    errors.email = "Email field has a invalid Email Address";
  }
  
  //CHECK IF THE FIELDS IS FILLED OUT
  if(Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }
  //CHECK IF THE FIELDS IS FILLED OUT
  if(Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }


  
  return {
    errors, 
    isValid: isEmpty(errors)
  }
}