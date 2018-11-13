import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {createProfile} from '../../actions/profileActions';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import InputGroup from '../common/InputGroup';
import './CreateProfile.scss';



class CreateProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      handle: '',
      status: '',
      company: '',
      website: '',
      bio: '',
      fieldofscience: '',
      youtube: '',
      twitter: '',
      instagram: '',
      facebook: '',
      errors: {}
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit = e => {
    e.preventDefault();
    
    const profileData = {
      handle: this.state.handle,
      status: this.state.status,
      company: this.state.company,
      website: this.state.website,
      bio: this.state.bio,
      fieldofscience: this.state.fieldofscience,
      youtube: this.state.youtube,
      twitter: this.state.twitter,
      instagram: this.state.instagram,
      facebook: this.state.facebook
    };
    this.props.createProfile(profileData, this.props.history)
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  componentWillReceiveProps = nextProps => {
    if(nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }



  render() {
    const { errors } = this.state;

    // SELECT OPTIONS 
    const options = [
      { label: '* Select Status ', value: 0},
      { label: 'Student', value: 'Student'},
      { label: 'Scientist', value: 'Scientist'},
      { label: 'Developer', value: 'Developer'},
      { label: 'Instructor', value: 'Instructor'},
      { label: 'Intern', value: 'Intern'},
      { label: 'Other', value: 'Other'},
    ];

    return (
      <div>
        <section className = "section-create-profile">
          <h1>Create Your iLabScience Profile</h1>
          <p>Complete information needed below</p>
          <p>Text field with stars (*) means that they are required fields</p>
          <div  className = "section-create-profile__div">
          <form onSubmit = {this.onSubmit} className = "section-create-profile__form">
            <TextFieldGroup
              placeholder = "* Profile Handle"
              name = "handle"
              value = {this.state.handle}
              onChange = {this.onChange}
              error={errors.handle}
              info = "This should be unique, this will be serve as the handle of your URL."
            />
            <TextFieldGroup
              placeholder = "Company"
              name = "company"
              value = {this.state.company}
              onChange = {this.onChange}
              error={errors.company}
            />
            <TextFieldGroup
              placeholder = "Website"
              name = "website"
              value = {this.state.website}
              onChange = {this.onChange}
              error={errors.website}
              info = "You can put your own website here that you wanted to show to public."
            />
            <TextFieldGroup
              placeholder = "* Field of Science"
              name = "fieldofscience"
              value = {this.state.fieldofscience}
              onChange = {this.onChange}
              error={errors.fieldofscience}
              info ="Use comma for the separation of each field you are interested in. (e.g. Biology, Computer Science)"
            />
            <TextAreaFieldGroup
              placeholder = "Bio"
              name = "bio"
              value = {this.state.bio}
              onChange = {this.onChange}
              errors={errors.bio}
            />
            <InputGroup
              placeholder = "Youtube URL"
              name ="youtube"
              value = {this.state.youtube}
              onChange = {this.onChange}
              error={errors.youtube}
            />
             <InputGroup
              placeholder = "Twitter URL"
              name ="twitter"
              value = {this.state.twitter}
              onChange = {this.onChange}
              error={errors.twitter}
            />
             <InputGroup
              placeholder = "Instagram URL"
              name ="instagram"
              value = {this.state.instagram}
              onChange = {this.onChange}
              error={errors.instagram}
            />
             <InputGroup
              placeholder = "Facebook URL"
              name ="facebook"
              value = {this.state.facebook}
              onChange = {this.onChange}
              error={errors.facebook}
            />
            <button type = "submit" className="submit-form">Submit &rarr;</button>
          </form>
          </div>
        </section>
      </div>
    )
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
})

export default connect(mapStateToProps, { createProfile })(withRouter (CreateProfile));
