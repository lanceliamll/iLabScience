import React, { Component } from 'react'
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';
import './ProfileAbout.scss';


class ProfileAbout extends Component {
  render() {

    const { profile } = this.props;
    // GET THE FIRST NAME WHICH IS THE INDEX 0
    const firstName = profile.user.name.trim().split(' ')[0];
    // GET THE FIELD OF SCIENCE TO DISPLAY ON THE PROFILE
    const fieldofscience = profile.fieldofscience.map((field, index) => (
      <p key ={index} className = "paragraph">
        {field} ,
      </p>
    ))

    return (
      <div class = "wrap">
        <div className="card">
          <div className="containter">
            <h3>{firstName}'s Bio</h3>
          </div>
            <p className = "paragraph">
             { isEmpty(profile.bio) ? (
               <span>{firstName} does not have a bio yet.</span>
             ):( <span>{profile.bio}</span>)}
            </p>
            <div className="containter">
            <h3>Field of Science that {firstName} is interested with.</h3>
          </div>
            { isEmpty(profile.fieldofscience) ? (
               <p>{firstName} does not have setup the field of science.</p>
             ):( <p>{fieldofscience} </p>)}
        </div>
      </div>
    )
  }
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
}
export default ProfileAbout;

