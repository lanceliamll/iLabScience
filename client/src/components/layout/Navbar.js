import React, { Component } from 'react'
import './Navbar.scss';
import iLabScience1 from '../../img/iLabScience1.png';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';


class Navbar extends Component {

  //HOME
  onClickHome = e => {
    this.props.history.push('/');
  }

  // LOGOUT
  onLogoutClick = e => {
    e.preventDefault()
    this.props.clearCurrentProfile;
    this.props.logoutUser();


  }
  render() {

    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className = "ul">
      <li>
      <Link to = "/dashboard">dashboard</Link>
      </li>
      <li><Link to = "/profiles">Developers</Link></li>
      <li>
        <a href = "#" onClick = {this.onLogoutClick.bind(this)}>
        Logout
        </a>
      </li>
      <li>
      <img 
          src={user.avatar} 
          alt={user.name}
          className = "rounded-avatar"
          />
      </li>
    </ul>
    )

    const guestLinks = (
      <ul className = "ul">
      <li><Link to = "/login">Login</Link></li>
      <li><Link to = "/register">Register</Link></li>
      <li><Link to = "/profiles">Developers</Link></li>
    </ul>
    )

    return (
      <div>
        <div>
      <nav className = "navigation">
       <div className="navigation__logo-box">
            <img 
              src={iLabScience1} 
              onClick = {this.onClickHome.bind(this)}
              alt="ILABSCIENCELOGO" 
              className = "navigation__logo"
               />
          </div>
          { isAuthenticated ? authLinks : guestLinks }
      </nav>
      <section className="section-one"></section>
    </div>
      </div>
    )
  }
}


Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,

})

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(withRouter(Navbar));