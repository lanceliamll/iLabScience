const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
  
  //INITIALIZE ERRORS
  let errors = {}

  //INITIALIZE THE STRINGS TO BE EMPTY FIRST
  data.text = !isEmpty(data.text) ? data.text : '';
  

  
  //CHECK IF THE LENGTH OF THE POST IS VALID
  if(!Validator.isLength(data.text, { min: 10, max: 500})){
    errors.text = "Post must be atleast 10 characters";
  }
  
  //CHECK IF THE FIELDS IS FILLED OUT
  if(Validator.isEmpty(data.text)) {
    errors.text = "Text field is required";
  }


  
  return {
    errors, 
    isValid: isEmpty(errors)
  }
}