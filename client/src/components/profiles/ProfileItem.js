import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';


class ProfileItem extends Component {
  render() {
    const { profile } = this.props;

    return (
      
          <div className="row">
            <div className="about-team">
             <figure className="about-team__shape">
                <img src={profile.user.avatar} alt="Project Manager" className = "about-team__photo"/>
                <figcaption className="about-team__caption">
                  {profile.handle}
                </figcaption>
             </figure>
            <div className="about-team__text">
              <h3 className="heading-tertiary u-margin-bottom-small">
                {profile.user.name}
              </h3>
                <p className = "paragraph">
                  {profile.status} {isEmpty(profile.company) ? null : (<span>at {profile.company}</span>)}
                  {isEmpty(profile.location) ? null : (<span>{profile.location}</span>)}
                </p>
                <Link to = {`/profile/${profile.handle}`} className = "paragraph btn btn-white"> View Profile</Link>
                  <h4 className = "paragraph">Field of Science</h4>
                    <ul className = "paragraph">
                      {profile.fieldofscience.slice(0, 4).map((field, index) => (
                        <li key = {index}>
                            {field}
                        </li>
                      ))}
                    </ul>
            </div>
            </div>
          </div>
      
    )
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
}

export default ProfileItem;

