import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Route, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import '../App.css';
import { sortPost } from '../actions/postActions';
import { fetchCategories } from '../actions/categoryActions';
import NewPost from './post/NewPost';
import NewComment from './comment/NewComment';
import EditComment from './comment/EditComment';
import EditPost from './post/EditPost';
import HomePage from './home/HomePage';
import PostDetail from './post/PostDetail';

class Index extends Component {
  static propTypes = {
    posts: PropTypes.array,
    categories: PropTypes.array
  };

  componentDidMount() {
    this.props.fetchCategories();
  }

  render() {
    const { categories, sortPost } = this.props;

    return (
      <div className="App">
        <div className="nav-header">
          <Link className="home" to="/">
            <nav className="navbar navbar-default">
              <div className="navbar-header">
                <h1>READABLE</h1>
              </div>
            </nav>
          </Link>
          <Link className="new-post" to="/new">
            <div className="text-xs-right">Add A Post</div>
          </Link>
        </div>

        <div>
          <div>
            <h6>Select a Category</h6>
            {categories &&
              categories.map(category => (
                <Link key={category.name} to={`/${category.path}`}>
                  <button className="btn btn-default">{category.name}</button>
                </Link>
              ))}
          </div>
          <br />
          <div>
            <h6>Sort By</h6>
            <button
              onClick={() => sortPost('timestamp')}
              className="btn btn-info"
            >
              Time
            </button>
            <button
              onClick={() => sortPost('voteScore')}
              className="btn btn-info"
            >
              Vote Score
            </button>
          </div>
        </div>

        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/new" component={NewPost} />
          <Route exact path="/:category" component={HomePage} />
          <Route exact path="/:category/:postId" component={PostDetail} />
          <Route path="/:category/:postId/edit" component={EditPost} />
          <Route path="/:category/:postId/comment" component={NewComment} />
          <Route
            path="/:category/:postId/:commentId/edit"
            component={EditComment}
          />
        </Switch>
      </div>
    );
  }
}

function mapStateToProps({ categories }) {
  return {
    categories
  };
}

export default withRouter(
  connect(mapStateToProps, {
    sortPost,
    fetchCategories
  })(Index)
);
