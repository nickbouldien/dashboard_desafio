import { SET_SEARCH_TERM, APP_ERROR } from '../actions/actionTypes';

const inputReducer = (state = {error: '', searchTerm: ''}, action) => {
  switch(action.type) {
    case SET_SEARCH_TERM:
      return { ...state, error: '', searchTerm: action.payload }
    case APP_ERROR:
      return { ...state, error: action.payload }
    default:
      return state;
  }
}

export default inputReducer;
