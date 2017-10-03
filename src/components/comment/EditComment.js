import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  fetchCommentForPost,
  updateComment
} from '../../actions/commentActions';

class EditComment extends Component {
  componentDidMount() {
    this.props.fetchCommentForPost(this.props.match.params.postId);
  }

  updateComment = e => {
    e.preventDefault();
    const commentId = this.props.comment.id;
    const postId = this.props.comment.parentId;
    const timestamp = Date.now();
    const body = e.target.body.value;

    if (body === '') {
      alert('Comment body cannot be empty');
    } else {
      this.props.updateComment(commentId, postId, timestamp, body, () =>
        this.props.history.push(`/post/${postId}`)
      );
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.updateComment}>
          <h2>Edit Comment</h2>
          <label>Comment *</label>
          <textarea
            defaultValue={this.props.comment.body}
            name="body"
            className="form-control"
          />
          <button className="btn btn-success">Update</button>
          <Link to={`/post/${this.props.comment.parentId}`}>
            <button className="btn btn-danger">Cancel</button>
          </Link>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ posts, comments }, { match }) {
  return {
    comment: _.find(comments[match.params.postId], {
      id: match.params.commentId
    })
  };
}

export default connect(mapStateToProps, { fetchCommentForPost, updateComment })(
  EditComment
);
