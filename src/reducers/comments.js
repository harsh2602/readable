import * as Types from '../actions/actionTypes';

function comments(state = {}, action) {
  const { comments, commentId, parentId, updatedComment } = action;
  switch (action.type) {
    case Types.FETCH_COMMENTS:
      return { ...state, [parentId]: comments };
    case Types.VOTE_COMMENT:
      return {
        ...state,
        [parentId]: state[parentId]
          .filter(v => v.id !== commentId)
          .concat([updatedComment])
      };
    case Types.UPDATE_COMMENT:
      return {
        ...state,
        [parentId]: state[parentId].map(comment => {
          if (comment.id === commentId) {
            comment = updatedComment;
          }
          return comment;
        })
      };
    case Types.ADD_COMMENT:
      return Object.assign({}, state, { [parentId]: comments });
    case Types.DELETE_COMMENT:
      return state;
    default:
      return state;
  }
}

export default comments;
