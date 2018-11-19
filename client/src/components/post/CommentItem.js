import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteComment } from '../../actions/postActions';

class CommentItem extends Component {

  onDeleteClick = (postId, commentId) => {
    this.props.deleteComment(postId, commentId);
  }

  render() {
    const { comment, postId, auth } = this.props 

    return (
      <div>
        <div className="row">
        <div className="about-team">
        <figure className="about-team__shape">
            <img src={comment.avatar} alt="Project Manager" className = "about-team__photo"/>
            <figcaption className="about-team__caption">
              {comment.handle}
            </figcaption>
         </figure>
        <div className="about-team__text">
        <h3 className="heading-tertiary u-margin-bottom-small">
          {comment.name}
        </h3>
        <p className = "paragraph">
          {comment.text} 
        </p>
        {/* <button onClick ={this.onLikeClick.bind(this, post._id)}> {post.likes.length} like</button>
        <button onClick ={this.onUnlikeClick.bind(this, post._id)}> unlike</button>
        <Link to = {`/post/${post._id}`}>Comments</Link> */}
        {comment.user === auth.user.id ? (
          <button onClick = {this.onDeleteClick.bind(this, postId, comment._id)}>Delete</button>
        ) : null}

       </div>
       </div>
       </div>
      </div>
    )
  }
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { deleteComment })(CommentItem)