import React, { Component } from 'react';
import isEmpty from '../../validation/is-empty';
import { Link } from 'react-router-dom';
import './ProfileHeader.scss';

 class ProfileHeader extends Component {
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
        <p  className = "paragraph">{profile.status} {isEmpty(profile.company) ? null : (<span> Working at {profile.company}</span>) } </p>
         {isEmpty(profile.location) ? null : (<p>{profile.location}</p>)}

         { isEmpty(profile.website) ? null : (<a className = "paragraph" href={profile.website} target = "_blank">Website</a>)}

         { isEmpty(profile.social && profile.social.twitter) ? null : (<a className = "paragraph" href={profile.social.twitter} target = "_blank">Twitter</a>)}

         { isEmpty(profile.social && profile.social.facebook) ? null : (<a className = "paragraph" href={profile.social.facebook} target = "_blank">Facebook</a>)}

         { isEmpty(profile.social && profile.social.youtube) ? null : (<a className = "paragraph" href={profile.social.youtube} target = "_blank">Youtube</a>)}

         { isEmpty(profile.social && profile.social.instagram) ? null : (<a className = "paragraph" href={profile.social.instagram} target = "_blank">Instagram</a>)}
      </div>
      </div>
    </div>
    )
  }
}




export default ProfileHeader;

