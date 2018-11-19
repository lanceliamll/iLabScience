import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import { getProfileByHandle } from '../../actions/profileActions';
import './Profile.scss';


 class Profile extends Component {
  componentDidMount() {
    if(this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }

  render() {
    const { profile, loading } = this.props.profile;

    let profileContent;

    if(profile === null || loading) {
      profileContent = <h4>Loading...</h4>
    } else {
      profileContent = (
        <div>
          <div>
            <Link to = "/profiles" className = "btn btn-white">Go Back</Link>
          </div>
          <ProfileHeader profile = {profile} />
          <ProfileAbout profile = {profile}/>
          <ProfileCreds education = {profile.education} scienceinventions = {profile.scienceinventions} />
        </div>
      )
    }

    return (
        <div>
        <section className="header-profile">
          <div className = "padding-top">
          {profileContent}
          </div>
        </section>
      
      </div>
  
    )
  }
}


Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
  
}

const mapStateToProps = state => ({
  profile: state.profile,

  
})

export default connect(mapStateToProps, { getProfileByHandle })(Profile);
