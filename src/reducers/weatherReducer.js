import { FETCH_WEATHER, APP_ERROR } from '../actions/actionTypes';

const weatherReducer = (state = {error: '', weather: {}}, action) => {
  switch(action.type) {
    case FETCH_WEATHER:
      return { ...state, error: '', weather: action.payload }
    case APP_ERROR:
      return { ...state, error: action.payload }
    default:
      return state;
  }
}

export default weatherReducer;
