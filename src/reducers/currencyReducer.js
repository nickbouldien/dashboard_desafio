import { FETCH_CURRENCY, APP_ERROR } from '../actions/actionTypes';

const currencyReducer = (state = [], action) => {
  switch(action.type) {
    case FETCH_CURRENCY:
      return [...state, action.payload];
    default:
      return state;
  }
}

export default currencyReducer;
