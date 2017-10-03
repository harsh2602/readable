import * as Types from '../actions/actionTypes'

function categories(state=[], action) {
  switch(action.type) {
    case Types.FETCH_CATEGORY:
      return action.payload.categories
    default:
      return state
  }
}

export default categories
