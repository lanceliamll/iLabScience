import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addComment } from '../../actions/postActions';




class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }

  componentWillReceiveProps(newProps) {
    if(newProps.errors) {
      this.setState({errors: newProps.errors})
    }
  }

  onChange = e => {
    this.setState({[e.target.name] : e.target.value })

 }

 onSubmit = e => {
   e.preventDefault();

  const { user } = this.props.auth;
  const { postId } = this.props;
  
  const newComment = {
    text: this.state.text,
    name: user.name,
    avatar: user.avatar,
  }
  this.props.addComment(postId, newComment);
  this.setState({text: ''});


 }

  render() {
    const { errors } = this.state;

    return (
      <div className = "wrap">
        <div className="card">
         <p className = "paragraph">Post something</p>
          <div className="container">
            <form onSubmit = {this.onSubmit}>
            {/* <TextAreaFieldGroup 
              placeholder= "Post what you love..."
              className = "text-width"
              name = "text"
              value = {this.state.text}
              onChange = {this.onChange}
              error = {errors.text}
              /> */}

               <textarea  
                className="text-width"
                placeholder = "Reply here...."
                name="text"
                value={this.state.text}
                onChange={this.onChange}
                error = {errors.text}
               />
            <button className = "btn btn-white" type = "Submit">Post</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}


CommentForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
 errors: state.errors,
 auth: state.auth
})

export default connect(mapStateToProps, { addComment })(CommentForm);
