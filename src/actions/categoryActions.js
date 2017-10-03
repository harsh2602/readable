import * as API from '../utils/NetworkAPI';
import * as Types from './actionTypes';

export const fetchCategories = () => {
  return dispatch => {
    API.fetchCategories().then(payload => {
      dispatch({
        type: Types.FETCH_CATEGORY,
        payload
      });
    });
  };
};
