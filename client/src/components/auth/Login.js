import React, { Component } from 'react';
import './Login.scss';
import TextFieldGroup from '../common/TextFieldGroup';



import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';




class Login extends Component {
constructor() {
  super()
  this.state = {
    email: '',
    password: '',
    errors: {}
  }
  //SHORTCUT
  this.onChange = this.onChange.bind(this)
  this.onSubmit = this.onSubmit.bind(this)
}


  //LIFE CYCLE METHODS
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }


//EVENTS
  onChange = e => {
    this.setState({[e.target.name]: e.target.value});  
  }

  onSubmit= e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    }

    this.props.loginUser(userData);
  }

  render() {
    
    const { errors } = this.state;
    
    return (
      <div>
        <section className="section">
          <div className="row">
            <div className="book">
              <div className="book__form">
                <form onSubmit ={this.onSubmit} className="form">
                  <div className=" u-margin-bottom-medium">
                    <h2 className="heading-secondary">
                      Get Started
                    </h2>
                  </div>
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
                  <div className="form__group">
                    <button type = "submit" className="btn btn-white">Login &rarr;</button>
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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(Login);
