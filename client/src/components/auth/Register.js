import React, { Component } from 'react';
import './Register.scss';
import TextFieldGroup from '../common/TextFieldGroup';

import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';



class Register extends Component {
  constructor(props){
    super(props);
    //V-MODEL LIKE HIHI BUT IN A HARDWAY
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    };
    //SHORTCUT
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
   
  }


  //LIFECYCLE METHODS

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }
  
  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({ errors: nextProps.errors});
    }
  }


    //FUNCTION/EVENTS
  onChange = e => {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    }
    this.props.registerUser(newUser, this.props.history);
  }
    

  render() {
    //FRONT-END VALIDATION
    const { errors } = this.state;


    return (
      <div>
        <section className="section">
          <div className="row">
            <div className="book-register">
              <div className="book-register__form">
                <form noValidate onSubmit={this.onSubmit} className= "form" >
                  <div className=" u-margin-bottom-medium">
                    <h2 className="heading-secondary">
                      Register Now
                    </h2>
                  </div>
                  <TextFieldGroup 
                    type = "text"
                    className = "form__input"
                    placeholder = "Name"
                    name = "name"
                    value = {this.state.name}
                    onChange = {this.onChange}
                    error = {errors.name}
                  />
                  <TextFieldGroup 
                    type = "email"
                    className = "form__input"
                    placeholder = "Email"
                    name = "email"
                    value = {this.state.email}
                    onChange = {this.onChange}
                    error = {errors.email}
                  />
                   <TextFieldGroup 
                    type = "password"
                    className = "form__input"
                    placeholder = "Password"
                    name = "password"
                    value = {this.state.password}
                    onChange = {this.onChange}
                    error = {errors.password}
                  />

                  <TextFieldGroup 
                    type = "password"
                    className = "form__input"
                    placeholder = "Confirm Password"
                    name = "password2"
                    value = {this.state.password2}
                    onChange = {this.onChange}
                    error = {errors.password2}
                  />
                  <div className="form__group">
                    <button className="btn btn-white">Login &rarr;</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { registerUser })(withRouter(Register));