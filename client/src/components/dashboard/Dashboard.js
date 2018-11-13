import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import   ProfileActions   from './ProfileActions';
import Inventions from './Inventions';
import Education from './Education';
import './Dashboard.scss';


class Dashboard extends Component {

  onClick = e => {
    this.props.history.push('/create-profile')
  }
  componentDidMount = () => {
    this.props.getCurrentProfile();

  }
  onDelete = e => {
    this.props.deleteAccount();
  }
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if(profile === null || loading) {
      dashboardContent = <h4>Loading...</h4>
    } else {
      // CHECK KUNG MAY EXISTING PROFILE DATA NA 
      if(Object.keys(profile).length > 0) {
        dashboardContent = (
         <div>
            <h3>Hi
            Welcome <Link to = {`/profile/${profile.handle}`}>{user.name}</Link>
           </h3>
           < ProfileActions />
           < Inventions scienceinventions = {profile.scienceinventions} />
           <div className = "delete-account-sec"/>
           <Education education = {profile.education} />
             <button className = "btn btn-red" onClick = {this.onDelete.bind(this)}>Delete my Account</button>
           
         </div>       
          ) 
      } else {
        // CHECK KUNG NAKA LOGIN TAPOS WALA PANG PROFILE
        dashboardContent = (
          <div>
            <h3>Hi, { user.name} </h3>
            <p>Setup your profile</p>
            <button onClick = {this.onClick.bind(this)} className="btn btn-white">Setup now &rarr;</button>
          </div>
        )
      }
    }
    
    return (
      <div>
        <section className="section-dashboard">
          <h1>Welcome to iLabScience</h1>
            {dashboardContent}
        </section>
      </div>

    )
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
})
export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(withRouter(Dashboard));