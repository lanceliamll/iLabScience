const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  
  //INITIALIZE ERRORS
  let errors = {}

  //INITIALIZE THE STRINGS TO BE EMPTY FIRST
  data.handle = !isEmpty(data.handle) ? data.handle : '';
  data.fieldofscience = !isEmpty(data.fieldofscience) ? data.fieldofscience : '';
  
  //VALIDATION TO MAKE SURE THAT THE HANDLE IS 2 - 40 CHARACTERS TO BE VALID
  if(!Validator.isLength(data.handle, { min: 2, max: 40})){
    errors.handle = 'Handle needs to be between 2 and 40 characters';
  }
  //FIELD NEEDS TO BE FILLED OUT
  if(Validator.isEmpty(data.handle)) {
    errors.handle = ' Handle field is required';
    
  }
  if(Validator.isEmpty(data.fieldofscience)) {
    errors.fieldofscience = 'Field of Science field is required'
  }
  
  //NEEDS TO BE A URL FORMAT 
  //isURL
  if(!isEmpty(data.website)) {
    if(!Validator.isURL(data.website)) {
      errors.website = 'This is not a valid URL'
    }
  }
  if(!isEmpty(data.youtube)) {
    if(!Validator.isURL(data.youtube)) {
      errors.youtube = 'This is not a valid URL'
    }
  }
  if(!isEmpty(data.twitter)) {
    if(!Validator.isURL(data.twitter)) {
      errors.twitter = 'This is not a valid URL'
    }
  }
  if(!isEmpty(data.instagram)) {
    if(!Validator.isURL(data.instagram)) {
      errors.instagram = 'This is not a valid URL'
    }
  }
  if(!isEmpty(data.facebook)) {
    if(!Validator.isURL(data.facebook)) {
      errors.facebook = 'This is not a valid URL'
    }
  }


  

  
  return {
    errors, 
    isValid: isEmpty(errors)
  }
}