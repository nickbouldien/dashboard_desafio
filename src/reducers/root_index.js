import { combineReducers } from 'redux';
// import { reducer as formReducer } from 'redux-form';
// import authReducer from './auth_reducer';
// import { searchTerm, locations } from './map_reducer';
// import * as reducers from './reducers'
import weatherReducer from './weatherReducer';
import inputReducer from './inputReducer';
import stockReducer from './stockReducer';
import currencyReducer from './currencyReducer';
import laneReducer from './laneReducer';

// console.log('in root_index weather: ', weatherReducer);

const rootReducer = combineReducers({
  weather: weatherReducer, // need to change to cards (cardReducer)
  inputReducer,
  stockReducer,
  currencyReducer,
  laneReducer
  // auth: authReducer,
  // searchTerm,
  // locations
});

export default rootReducer;
