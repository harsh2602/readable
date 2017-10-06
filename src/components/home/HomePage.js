import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Post from '../post/Post';
import { connect } from 'react-redux';
import { fetchAllPosts } from '../../actions/postActions';

class HomePage extends Component {
  static propTypes = {
    posts: PropTypes.array
  };

  componentDidMount() {
    this.props.fetchAllPosts();
  }

  render() {
    const { posts } = this.props;
    return <div>{posts.map(post => <Post key={post.id} post={post} />)}</div>;
  }
}

function mapStateToProps({ posts }, { match }) {
  const { category } = match.params;
  return {
    posts: category ? posts.filter(post => post.category === category) : posts
  };
}

export default connect(mapStateToProps, { fetchAllPosts })(HomePage);
