import { FETCH_CURRENCY, APP_ERROR } from '../actions/actionTypes';

const currencyReducer = (state = {error: '', currency: {}}, action) => {
  switch(action.type) {
    case FETCH_CURRENCY:
      return { ...state, error: '', currency: action.payload }
    case APP_ERROR:
      return { ...state, error: action.payload }
    default:
      return state;
  }
}

export default currencyReducer;
