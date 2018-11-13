//MODULES
import axios from 'axios';
import jwt_decode from 'jwt-decode';
//TYPES
import { GET_ERRORS, SET_CURRENT_USER } from './types';

//AUTHTOKENS
import setAuthToken from '../utils/setAuthToken';



//REGISTER USER
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    });
}

//LOGIN USER
export const loginUser = (userData) => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      //AUTH
      //SAVE TO LOCAL STORAGE
      const { token } = res.data;
      //SET THE TOKEN TO LOCALSTORAGE
      localStorage.setItem('jwtToken', token);
      //SET THE TOKEN TO AUTH HEADER LIKE ON THE POSTMAN
      setAuthToken(token);
      //DECODE JWT TO GET THE USER DATA
      const decoded = jwt_decode(token);
      //SET CURRENT USER
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
}

//SET LOGGED IN USER
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

//LOG OUT
export const logoutUser = () => dispatch => {
  // REMOVE TOKEN FROM THE LOCALSTORAGE
  localStorage.removeItem('jwtToken');
  // REMOVE AUTH HEADER FROM THE REQUESTS
  setAuthToken(false);
  // SET THE CURRENTUSER TO {} EMPTY OBJECT WHICH WILL SET THE ISAUTHENTICATED TO FALSE
  dispatch(setCurrentUser({}));
}