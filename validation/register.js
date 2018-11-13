const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  
  //INITIALIZE ERRORS
  let errors = {}

  //INITIALIZE THE STRINGS TO BE EMPTY FIRST
  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';


  //CHECK IF THE FIELDS IS FILLED OUT
  if(Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }
  //CHECK IF THE FIELDS IS FILLED OUT
  if(Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }
  //CHECK IF THE FIELDS IS FILLED OUT
  if(Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  if(!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Password must match";
  }

  //CHECK IF THE INPUTTED NAME IS VALID AND IS 2 TO 40 CHARACTERS
  if(!Validator.isLength(data.name, { min: 2, max: 40 })) {
    errors.name = 'Name does not meet the requirements needed.';
  }     
  //CHECK IF THE EMAIL IS A VALID EMAIL
  if(!Validator.isEmail(data.email)) {
    errors.email = "Email field has an invalid Email Address";
  }
  //CHECK IF THE PASSWORD IS ATLEAST 6 CHARACTERS
  if(!Validator.isLength(data.password, { min: 6, max: 50})) {
    errors.password = "Password must be atleast 6 characters";
  }
  //CHECK IF THE PASSWORD AND PASSWORD2 IS MATCHED
  if(!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }
  
  return {
    errors, 
    isValid: isEmpty(errors)
  }
}

