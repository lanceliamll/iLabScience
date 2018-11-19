import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { deletePost, addLike, removeLike } from '../../actions/postActions';



 class PostItem extends Component {


  onDeleteClick = id => {
    this.props.deletePost(id);
  }

  onLikeClick = id => {
   this.props.addLike(id)
  }
  onUnlikeClick = id => {
    this.props.removeLike(id)
  }
  render() {
    const { post, auth } = this.props;
    return (
      <div className="row">
      <div className="about-team">
       <figure className="about-team__shape">
          <img src={post.avatar} alt="Project Manager" className = "about-team__photo"/>
          <figcaption className="about-team__caption">
            {post.handle}
          </figcaption>
       </figure>
      <div className="about-team__text">
        <h3 className="heading-tertiary u-margin-bottom-small">
          {post.name}
        </h3>
        <p className = "paragraph">
          {post.text} 
        </p>
        <button onClick ={this.onLikeClick.bind(this, post._id)}> {post.likes.length} like</button>
        <button onClick ={this.onUnlikeClick.bind(this, post._id)}> unlike</button>
        <Link to = {`/post/${post._id}`}>Comments</Link>
        {post.user === auth.user.id ? (
          <button onClick = {this.onDeleteClick.bind(this, post._id)}>Delete</button>
        ) : null}

      </div>
      </div>
    </div>
    )
  }
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(PostItem);
