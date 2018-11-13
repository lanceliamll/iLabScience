import axios from 'axios';

const setAuthToken = token => {
  //IF TOKEN EXISTS
  if(token) {
    //APPLY TO EVERY REQUEST
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    //DELETE AUTH HEADER IF TOKEN IS NOT PRESENT
    delete axios.defaults.headers.common['Authorization']
  }
};

export default setAuthToken;
