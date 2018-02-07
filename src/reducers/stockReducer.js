import { FETCH_STOCK } from '../actions/actionTypes';
import { goog_stock, aapl_stock } from '../mockData';

const initialState = [
  goog_stock,
  aapl_stock
];

const stockReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_STOCK:
      const newStock = action.payload;
      return [...state, newStock]
    default:
      return state;
  }
}

export default stockReducer;
