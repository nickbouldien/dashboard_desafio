import { FETCH_WEATHER, APP_ERROR } from '../actions/actionTypes';
import { ny_weather, memphis_weather, sf_weather } from '../mockData';

const initialState = [
  ny_weather,
  memphis_weather,
  sf_weather
]

const weatherReducer = (state = initialState, action) => {
  // console.log('weatherReducer state', state);
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
