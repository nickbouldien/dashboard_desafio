import { FETCH_WEATHER, APP_ERROR, DELETE_WEATHER } from '../actions/actionTypes';
import { ny_weather, memphis_weather, sf_weather } from '../mockData';

const initialState = [
  ny_weather,
  memphis_weather,
  sf_weather
];

const weatherReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_WEATHER:
      const newWeather = action.payload;
      return [...state, newWeather];
    case DELETE_WEATHER:
      return state;
    default:
      return state;
  }
}

export default weatherReducer;
