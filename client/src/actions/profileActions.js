import axios from 'axios';

import { GET_PROFILE,
         PROFILE_LOADING,
         GET_ERRORS,
         CLEAR_CURRENT_PROFILE,
         SET_CURRENT_USER, 
         GET_PROFILES} from './types';


// GET CURRENT PROFILE
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios.get('/api/profile')
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    })
    .catch(err => 
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    )
}

// GET ALL PROFILES
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading())
  axios.get('/api/profile/all')
    .then(res => {
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    })
}

// GET PROFILE BY HANDLE

export const getProfileByHandle = (handle) => dispatch => {
  dispatch(setProfileLoading())
  axios.get(`/api/profile/handle/${handle}`)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    })
};


// PROFILE LOADING
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  }
}


// CLEAR PROFILE
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  }
}

// CREATE PROFILE
export const createProfile = (profileData, history) => dispatch => {
  axios.post('/api/profile', profileData)
    .then(res => history.push('/dashboard'))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
}

// ADD INVENTIONS 
export const addInvention = (inventionData, history) => dispatch => {
  axios.post('/api/profile/inventions', inventionData)
    .then(res => history.push('/dashboard'))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
};

// ADD EDUCATION
export const addEducation = (educationData, history ) => dispatch => {
  axios.post('/api/profile/education', educationData)
    .then(res => history.push('/dashboard'))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
};


// DELETE ACCOUNT & PROFILE
export const deleteAccount = () => dispatch => {
  if(window.confirm('Are you sure you wanted to delete your account?')) {
    axios.delete('/api/profile')
      .then(res => {
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      })
  }
};

// DELETE INVENTION
export const deleteInvention = (id) => dispatch => {
  axios.delete(`/api/profile/inventions/${id}`)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
}

// DELETE EDUCATION
export const deleteEducation = id => dispatch => {
  axios.delete(`/api/profile/education/${id}`)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
}

