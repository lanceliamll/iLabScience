import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import  TextFieldGroup  from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addInvention } from '../../actions/profileActions';

class AddInvention extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      location: '',
      errors: {}
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);

  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({ errors: nextProps.errors});
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const inventionData = {
      title: this.state.title,
      description: this.state.description,
      location: this.state.location

    };

    this.props.addInvention(inventionData, this.props.history);
  }

  onChange = e => {
    this.setState({[e.target.name] : e.target.value});
  }
  render() {
    const { errors } = this.state;

    return (
      <section className = "section-create-profile">
          <Link to = "/dashboard" className = "btn btn-white">
            Go back
          </Link>
          <h1> Add your Favorite Science Inventions </h1>
          <p>It's time to show off your best inventions</p>
          <div  className = "section-create-profile__div">
            <form onSubmit = {this.onSubmit} 
            className = "section-create-profile__form">
              <TextFieldGroup
                placeholder = "Title"
                name = "title"
                value ={this.state.title}
                onChange = {this.onChange}
                error={errors.title}
              />
              <TextAreaFieldGroup
                placeholder = "Description"
                name = "description"
                value ={this.state.description}
                onChange = {this.onChange}
                error={errors.description}
              />
              <TextAreaFieldGroup
                placeholder = "Location"
                name = "location"
                value ={this.state.location}
                onChange = {this.onChange}
                error={errors.location}
              />
              <button type = "submit" className="submit-form">Submit &rarr;</button>
            </form>
          </div>
      </section>
    )
  }
}

AddInvention.propTypes = {
  addInvention: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
})
export default connect(mapStateToProps, { addInvention})(withRouter(AddInvention));
