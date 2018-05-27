import axios from 'axios';
import {
  FETCH_WEATHER,
  APP_ERROR,
  SET_SEARCH_TERM,
  FETCH_STOCK,
  FETCH_CURRENCY,
  ATTACH_TO_LANE,
  DETACH_FROM_LANE,
  MOVE,
  DELETE_WEATHER,
} from './actionTypes';
import { WEATHER_KEY } from '../constants/itemTypes';

let ROOT_URL;

if (process.env.NODE_ENV === 'production') {
  ROOT_URL = '/';
} else {
  ROOT_URL = 'http://localhost:3000/';
  console.log('dev mode root url: ', ROOT_URL);
  console.log('weather key:', WEATHER_KEY);
}

/* make a default error handler (not for auth errors, just routine application errors) */
export const applicationError = error => ({
  type: APP_ERROR,
  payload: error,
});

/*
      SEARCH actions
*/
export function setSearchTerm(searchTerm) {
  return { type: SET_SEARCH_TERM, payload: searchTerm };
}

export function getSearchTerm(searchTerm, searchType) {
  return (dispatch) => {
    dispatch(setSearchTerm(searchTerm, searchType));
  }
}

/*
      WEATHER actions
*/
export function fetchWeather(weather) {
  return { type: FETCH_WEATHER, payload: weather };
}

export function getWeather(queryCity, units="I", laneId, cardId, type) {
  const WEATHER_URL = `https://api.weatherbit.io/v2.0/current?city=${queryCity}&key=${WEATHER_KEY}&units=${units}`;
  return (dispatch) => {
    axios.get(WEATHER_URL)
    .then((res) => {
      const response = res && res.data && res.data.data && res.data.data[0]; // this is ugly...
      if (response) {
        response.id = cardId;
        response.type = type;
        dispatch(fetchWeather(response));
        dispatch(attachToLane(laneId, cardId));
      } else {
        throw new Error("not a valid city");
      }
    })
    .catch((error) => {
      dispatch(applicationError(error));
      console.error("Error getting weather: ", error);  //eslint-disable-line no-console
    });
  }
}

/*
      STOCK actions
*/
export function fetchStock(stockData) {
  return { type: FETCH_STOCK, payload: stockData };
}

export function getStock(stockSymbol = 'AMZN', laneId, cardId, type) {
  const STOCK_URL = `https://api.iextrading.com/1.0/stock/${stockSymbol}/quote`;
  
  return (dispatch) => {
    axios.get(STOCK_URL)
    .then((res) => {
      if (res) {
        const { data } = res;
        data.id = cardId;
        data.type = type;
        dispatch(fetchStock(data));
        dispatch(attachToLane(laneId, cardId));
      }
    })
    .catch((error) => {
      dispatch(applicationError(error));
      console.error("Error getting stock data: ", error);  //eslint-disable-line no-console
    });
  }
}

/*
      CURRENCY actions
*/
export function fetchCurrency(currencyData) {
  return { type: FETCH_CURRENCY, payload: currencyData };
}

export function getCurrency(currencySymbol='USD', laneId, cardId, type) {
  const CURRENCY_URL = `https://api.fixer.io/latest?base=${currencySymbol}`;
  return (dispatch) => {
    axios.get(CURRENCY_URL)
    .then((res) => {
      const { data } = res;
      data.id = cardId;
      data.type = type;
      dispatch(fetchCurrency(data));
      dispatch(attachToLane(laneId, cardId));
    })
    .catch((error) => {
      dispatch(applicationError(error));
      console.error("Error getting currency data: ", error);  //eslint-disable-line no-console
    });
  }
}

/*
      LANE actions
*/
export const attachToLane = (laneId, cardId) => ({
  type: ATTACH_TO_LANE,
  laneId,
  cardId,
});

export const detachFromLane = (laneId, cardId) => ({
  type: DETACH_FROM_LANE,
  laneId,
  cardId,
});

export const move = ({ sourceId, targetId }) => ({
  type: MOVE,
  sourceId,
  targetId,
});

export const updateLane = (updateLane) => ({
  type: UPDATE_LANE,
  ...updatedLane,
});

export const deleteWeather = (id) => ({
  type: DELETE_WEATHER,
  id,
});


/* TODO: implement auth (below) */

// export function logInUser({ email, password }, history) {
//   return function(dispatch){
//     axios.post(`${ROOT_URL}login`, { email, password })
//     .then(response => {
//       if (response.data && response.data.token) {
//         console.log('in logInUser actionCreators ', response.data.user);
//         dispatch(authUser(response.data.user));
//
//         // save JWT token
//         localStorage.setItem('token', response.data.token);
//         localStorage.setItem('user', JSON.stringify(response.data.user));
//
//         // redirect user
//         history.push('/map');
//       }
//     })
//     .catch((error) => {
//       console.error("the error is: ", error);
//       const err = (error && error.response && error.response.data) || "Network Error"; //JSON.stringify(error);
//       dispatch(authError(err));
//     })
//   }
// }
//
// export function signUpUser({ firstName, lastName, email, password }, history) {
//   return function(dispatch) {
//     axios.post(`${ROOT_URL}signup`, { firstName, lastName, email, password })
//     .then(response => {
//       console.log('in signUpUser actionCreators ', response.data);
//       dispatch(authUser(response.data.user));
//
//       // save JWT token
//       localStorage.setItem('token', response.data.token);
//       localStorage.setItem('user', JSON.stringify(response.data.user));
//       history.push('/map');
//     })
//     .catch(error => {
//       console.error('Error: ', error);
//       const err = (error && error.response && error.response.data) || "Network Error"; //JSON.stringify(error);
//       dispatch(authError(err));
//     })
//   }
// }
//
// export function logOutUser() {
//   localStorage.removeItem('token');
//   localStorage.removeItem('user');
//   return { type: UNAUTH_USER };
// }


/*
      AUTH / user actions
*/
// export function authError(error) {
//   return {
//     type: AUTH_ERROR,
//     payload: error
//   }
// }
//
// export function authUser(user) {
//   console.log('authorizinguser ', user);
//   return {
//     type: AUTH_USER,
//     payload: user
//   }
// }