import { FETCH_WEATHER, APP_ERROR } from '../actions/actionTypes';
import { ny_weather, memphis_weather, sf_weather } from '../mockData';

const initialState = [
  ny_weather,
  memphis_weather,
  sf_weather
];

const weatherReducer = (state = initialState, action) => {
  // console.log('weatherReducer state', state);
  switch(action.type) {
    case FETCH_WEATHER:
      const newWeather = action.payload;
      console.log('weatherReducer state', [...state, newWeather]);
      return [...state, newWeather];
    // case APP_ERROR:
    //   return [...state, newWeather];
    default:
      return state;
  }
}

export default weatherReducer;
