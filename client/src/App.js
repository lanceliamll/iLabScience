import jwt_decode from "jwt-decode";
import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { logoutUser, setCurrentUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";
import "./App.css";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import PrivateRoute from "./components/common/PrivateRoute";
import CreateProfile from "./components/create-profile/CreateProfile";
import Dashboard from "./components/dashboard/Dashboard";
import EditProfile from "./components/edit-profile/EditProfile";
import AddEducation from "./components/inventioneducation/AddEducation";
import AddInvention from "./components/inventioneducation/AddInvention";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import Post from "./components/post/Post";
import Posts from "./components/posts/Posts";
import Profile from "./components/profile/Profile";
import Profiles from "./components/profiles/Profiles";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";

// CHECK FOR THE TOKEN
if (localStorage.jwtToken) {
  // SET AUTH TOKEN HEADER AUTH
  setAuthToken(localStorage.jwtToken);
  // DECODE TOKEN AND GET THE DATA/EXP
  const decoded = jwt_decode(localStorage.jwtToken);
  // SET THE USER AND AUTHENTICATE
  store.dispatch(setCurrentUser(decoded));

  // CHECK FOR THE EXPIRED TOKEN
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // LOGOUT USER
    store.dispatch(logoutUser());
    //CLEAR PROFILE
    store.dispatch(clearCurrentProfile());
    //REDIRECT TO LOGIN
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:handle" component={Profile} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-invention"
                  component={AddInvention}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-education"
                  component={AddEducation}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/feed" component={Posts} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/post/:id" component={Post} />
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
