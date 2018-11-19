import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PostForm from './PostForm';
import PostFeed from './PostFeed';
import { getPosts } from '../../actions/postActions';
import './Posts.scss'


class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    // GET POSTS AND LOADING
    const { posts, loading } = this.props.post;

    let postContent;

    if(posts === null || loading) {
      postContent = <h3 className = "paragraph">Loading...</h3>
    } else {
      postContent = <PostFeed posts={posts}/>
    }

    return (
      <div className  = "post-field">
          <PostForm />
          {postContent}
      </div>
    )
  }
}


Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  post: state.post
})


export default connect(mapStateToProps, { getPosts })(Posts);