import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './ProfileCreds.scss';



 class ProfileCreds extends Component {
  render() {

    const { scienceinventions, education } = this.props;

    const inventionItems = scienceinventions.map(inv => (
      <p key = {inv._id}>
        <h4>Title: {inv.title}</h4>
        <p>Descrition: {inv.description}</p>
        <p>Location: {inv.location}</p>
      </p>
    ));

    const educationItems = education.map(edu => (
      <p key = {edu._id}>
      <h4>{edu.school}</h4>
      <p>{edu.degree}</p>
      <p>{edu.fieldofstudy}</p>
      <p>{edu.from}</p>
      <p>{edu.to}</p>
      <p>{edu.description}</p>
    </p>
    ));

    return (
      <div className = "wrap">
        <div className="card">
          <div className="container">
            <h4>Science Inventions</h4>
            { inventionItems.length > 0 ? (
                <p>{inventionItems}</p>
            ) : (
              <p>No Inventions yet</p>
            )}
          </div>

          <div className="container">
            <h4>Education</h4>
            { educationItems.length > 0 ? (
                <p>{educationItems}</p>
            ) : (
              <p>No Education yet</p>
            )}
          </div>
        </div>
      </div>
    )
  }
}

ProfileCreds.propTypes = {
  profile: PropTypes.object.isRequired
}
export default ProfileCreds;
