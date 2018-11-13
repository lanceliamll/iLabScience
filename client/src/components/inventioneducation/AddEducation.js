import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addEducation } from '../../actions/profileActions';



class AddEducation extends Component {
  constructor(props){
    super(props);

    this.state = {
      school: '',
      degree: '',
      fieldofstudy: '',
      from: '',
      to: '',
      description: '',
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const educationData = {
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      description: this.state.description
    }

    this.props.addEducation(educationData, this.props.history);
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
          <h1> Specify your Degree </h1>
          <div  className = "section-create-profile__div">
            <form onSubmit = {this.onSubmit} 
            className = "section-create-profile__form">
              <TextFieldGroup
                placeholder = "School"
                name = "school"
                value ={this.state.school}
                onChange = {this.onChange}
                //error={errors.school}
              />
              <TextAreaFieldGroup
                placeholder = "Degree or Certification"
                name = "degree"
                value ={this.state.degree}
                onChange = {this.onChange}
                //error={errors.degree}
              />
              <TextAreaFieldGroup
                placeholder = "Field of Study"
                name = "fieldofstudy"
                value ={this.state.fieldofstudy}
                onChange = {this.onChange}
                //error={errors.fieldofstudy}
              />
              <TextFieldGroup 
                name = "from"
                type = "date"
                value = {this.state.from}
                onChange = {this.onChange}
               // error = {errors.from}
              />
               <TextFieldGroup 
                name = "to"
                type = "date"
                value = {this.state.to}
                onChange = {this.onChange}
                //error = {errors.to}
              />
              <TextAreaFieldGroup 
                placeholder = "Description"
                name = "description"
                value = {this.state.description}
                onChange = {this.onChange}
                //error = {errors.description}
                //info = "Please tell us about your degree"
              />
              <button type = "submit" className="submit-form">Submit &rarr;</button>
            </form>
          </div>

      </section>
    )
  }
}

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};


const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { addEducation })(withRouter(AddEducation));
