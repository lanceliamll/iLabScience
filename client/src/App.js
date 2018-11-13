import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';

import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/common/PrivateRoute';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddInvention from './components/inventioneducation/AddInvention';
import AddEducation from './components/inventioneducation/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';



// CHECK FOR THE TOKEN
if(localStorage.jwtToken) {
  // SET AUTH TOKEN HEADER AUTH
  setAuthToken(localStorage.jwt);
  // DECODE TOKEN AND GET THE DATA/EXP
  const decoded = jwt_decode(localStorage.jwtToken);
  // SET THE USER AND AUTHENTICATE
  store.dispatch(setCurrentUser(decoded));

  // CHECK FOR THE EXPIRED TOKEN
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    // LOGOUT USER
    store.dispatch(logoutUser());
    //CLEAR PROFILE
    store.dispatch(clearCurrentProfile());
    //REDIRECT TO LOGIN
    window.location.href = '/login'
  } 
}



class App extends Component {
  render() {
    return (
    <Provider store = {store}>
      <Router>
      <div className="App">
        <Navbar />
        <Route exact path= "/" component= {Landing}/>
          <div className="container">
            <Route exact path = "/register" component = {Register}/>
            <Route exact path = "/login" component = {Login}/>
            <Route exact path = "/profiles" component = {Profiles}/>
            <Route exact path = "/profile/:handle"  component = {Profile}/>
            <Switch>
            <PrivateRoute exact path = "/dashboard" component = {Dashboard} />
            </Switch>
            <Switch>
            <PrivateRoute exact path = "/create-profile" component = {CreateProfile} />
            </Switch>
            <Switch>
            <PrivateRoute exact path = "/edit-profile" component = {EditProfile} />
            </Switch>
            <Switch>
            <PrivateRoute exact path = "/add-invention" component = {AddInvention} />
            </Switch>
            <Switch>
            <PrivateRoute exact path = "/add-education" component = {AddEducation} />
            </Switch>
          </div>
        <Footer />
      </div>
      </Router>
    </Provider>  
    );
  }
}

export default App;
