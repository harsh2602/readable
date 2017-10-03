import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllPosts, updatePost } from '../../actions/postActions';
import { fetchCommentForPost } from '../../actions/commentActions';

class EditPost extends Component {
  componentDidMount() {
    this.props.fetchAllPosts();
    this.props.fetchCommentForPost(this.props.match.params.postId);
  }

  editPost = e => {
    e.preventDefault();
    const postId = this.props.post.id;
    const title = e.target.title.value;
    const body = e.target.body.value;

    if (body === '' || title === '') {
      alert('Both body and title fields are mandatory');
    } else {
      this.props.updatePost(postId, title, body, () =>
        this.props.history.push('/')
      );
    }
  };

  render() {
    const { post } = this.props;

    return (
      <div>
        <form onSubmit={this.editPost}>
          <br />
          <h2>Edit Post</h2>
          <label>Title *</label>
          <input
            defaultValue={post.title}
            type="text"
            name="title"
            className="form-control"
          />
          <label>Post *</label>
          <textarea
            defaultValue={post.body}
            name="body"
            id="field5"
            className="form-control"
          />
          <button className="btn btn-success">Update</button>
          <Link to={`/post/${post.id}`}>
            <button className="btn btn-danger">Cancel</button>
          </Link>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ posts, comments }, { match }) {
  return {
    post: _.find(posts, { id: match.params.postId }),
    comments: comments[match.params.postId]
  };
}

export default connect(mapStateToProps, {
  fetchAllPosts,
  updatePost,
  fetchCommentForPost
})(EditPost);
