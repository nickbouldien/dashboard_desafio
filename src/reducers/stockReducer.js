import { FETCH_STOCK, APP_ERROR } from '../actions/actionTypes';

const stockReducer = (state = {error: '', stock: {}}, action) => {
  switch(action.type) {
    case FETCH_STOCK:
      return { ...state, error: '', stock: action.payload }
    case APP_ERROR:
      return { ...state, error: action.payload }
    default:
      return state;
  }
}

export default stockReducer;
