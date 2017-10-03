import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createPost } from '../../actions/postActions';
import { guid } from '../../utils/Utils';

class NewPost extends Component {
  addNewPost = e => {
    e.preventDefault();

    const submitPost = {
      id: guid(),
      timestamp: Date.now(),
      title: e.target.title.value,
      body: e.target.body.value,
      author: e.target.author.value,
      category: e.target.category.value
    };
    this.props.createPost(submitPost, () => this.props.history.push('/'));
  };

  render() {
    return (
      <form onSubmit={this.addNewPost}>
        <h2>New Post</h2>
        <label>Category* </label>
        <br />
        <select name="category" className="btn btn-default dropdown-toggle">
          {this.props.categories &&
            this.props.categories.map(category => (
              <option key={category.name} value={category.name}>
                {category.name}
              </option>
            ))}
        </select>
        <br />
        <br />
        <label>Name *</label>
        <input type="text" name="author" className="form-control" />
        <label>Title *</label>
        <input type="text" name="title" className="form-control" />
        <label>Post *</label>
        <textarea name="body" className="form-control" />
        <br />
        <button className="btn btn-success">Submit </button>
      </form>
    );
  }
}

function mapStateToProps({ categories }) {
  return {
    categories
  };
}

export default connect(mapStateToProps, { createPost })(NewPost);
