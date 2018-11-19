import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfiles } from '../../actions/profileActions';
import ProfileItem from './ProfileItem';


class Profiles extends Component {

  componentDidMount() {
    this.props.getProfiles();

  }

  render() {

    const { profiles, loading} = this.props.profile;

    let profileItems;

    if(profiles === null || loading) {
      profileItems = <h4> Loading....</h4>
    } else {
      if(profiles.length > 0) {
         profileItems = profiles.map(profile => (
           <ProfileItem key = {profile._id} profile={profile} />
         ))
      } else {
        profileItems = <h4>No Profiles Found...</h4>
      }
    }

    return (
      <div>
        <section className = "header-profile">
          <div className = "padding-top">
          <h1>Developer Profiles</h1>
          <p> Developers who contributed to create this Application </p>
          {profileItems}
          </div>
        </section>
      </div>
    )
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, { getProfiles })(Profiles);
