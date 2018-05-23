import { combineReducers } from 'redux';
import weatherReducer from './weatherReducer';
import inputReducer from './inputReducer';
import stockReducer from './stockReducer';
import currencyReducer from './currencyReducer';
import laneReducer from './laneReducer';
import errorReducer from './errorReducer';

const rootReducer = combineReducers({
  weather: weatherReducer,
  stocks: stockReducer,
  currencies: currencyReducer,
  errors: errorReducer,
  inputReducer,
  laneReducer,
});

export default rootReducer;
