import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPost } from '../../actions/postActions';
import PostItem from '../posts/PostForm';
import { Link } from 'react-router-dom';
import './Post.scss';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';

class Post extends Component {

  componentDidMount() {
    this.props.getPost(this.props.match.params.id)
  }

  render() {

    const { post, loading } = this.props.post;
    let postContent;

    if(post === null || loading || Object.keys(post).length === 0) {
      postContent = <h3>Loading...</h3>
    } else {
      postContent  = (<div>
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
        
      </div>
      </div>
    </div>
    
    <CommentFeed postId = {post._id} comments={post.comments} />
    </div>
      
     )  
  }

    return (
      <div className = "single-post-feed">
      <Link to = '/feed'>Go back</Link>
      
        {postContent}
        <CommentForm postId = {post._id}/>
        
      </div>
    )
  }
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  post: state.post
})

export default connect(mapStateToProps, { getPost })(Post);
