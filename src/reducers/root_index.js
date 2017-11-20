import { combineReducers } from 'redux';
// import { reducer as formReducer } from 'redux-form';
// import authReducer from './auth_reducer';
// import { searchTerm, locations } from './map_reducer';
// import * as reducers from './reducers'
import weatherReducer from './weatherReducer';
import inputReducer from './inputReducer';
import stockReducer from './stockReducer';

const rootReducer = combineReducers({
  weatherReducer,
  inputReducer,
  stockReducer
  // auth: authReducer,
  // searchTerm,
  // locations
});

export default rootReducer;
