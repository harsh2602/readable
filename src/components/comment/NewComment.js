import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createComment } from '../../actions/commentActions';
import { guid } from '../../utils/Utils';

class NewComment extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const postId = this.props.match.params.postId;
    const commendBody = e.target.body.value;
    const author = e.target.author.value;

    console.log(commendBody);
    if (commendBody === '' || author === '') {
      alert('Both fields are mandatory');
    } else {
      const submitComment = {
        id: guid(),
        parentId: postId,
        timestamp: Date.now(),
        body: commendBody,
        author: author
      };
      this.props.createComment(submitComment, postId, () =>
        this.props.history.push(`/post/${postId}`)
      );
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <br />
        <h3>Add a Comment</h3>
        <label>Name*</label>
        <input type="text" name="author" className="form-control" />
        <label>Comment*</label>
        <textarea name="body" className="form-control" />
        <button className="btn btn-primary">Submit</button>
      </form>
    );
  }
}

function mapStateToProps({ posts, categories }) {
  console.log('state', this.state);
  return {
    posts: posts
  };
}

export default connect(mapStateToProps, { createComment })(NewComment);
