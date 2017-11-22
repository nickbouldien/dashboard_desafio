import axios from 'axios';
import {
  FETCH_WEATHER,
  APP_ERROR,
  SET_SEARCH_TERM,
  FETCH_STOCK,
  FETCH_CURRENCY,
  ATTACH_TO_LANE,
  DETACH_FROM_LANE,
  MOVE
} from './actionTypes';

let ROOT_URL;

if (process.env.NODE_ENV === 'production') {
  ROOT_URL = '/';
} else {
  ROOT_URL = 'http://localhost:3090/';
}

const WEATHER_KEY = process.env.WEATHER_KEY || '2c6d4627538f4d09bf0bf753cab3e0d3';

// apis to integrate:
// stock
// weather
// currency
// joke?
// event?  https://developer.ticketmaster.com/products-and-docs/apis/getting-started/

// console.log('the weather key: ', WEATHER_KEY, 'REACT_APP_WEATHER_KEY is: ', process.env.REACT_APP_WEATHER_KEY);

// console.log('actioncreators user ', user && JSON.parse(user) && JSON.parse(user).email);
// let userEmail;
// try {
//   userEmail = user && JSON.parse(user) && JSON.parse(user).email;
// } catch (err) {
//   userEmail = null;
// }


/* make a default error handler (for not auth, just routine errors) */
export function applicationError(error) {
  return {
    type: APP_ERROR,
    payload: error
  }
}

/*
      SEARCH actions
*/
export function setSearchTerm(searchTerm) {
  // console.log('setSearchTerm: ', searchTerm);
  return { type: SET_SEARCH_TERM, payload: searchTerm };
}

export function getSearchTerm(searchTerm, searchType) {
  // console.log('getWeather called: ', WEATHER_URL);
  return (dispatch) => {
    dispatch(setSearchTerm(searchTerm, searchType));


  }
}

/*
      WEATHER actions
*/
export function fetchWeather(weather) {
  // console.log('fetchLocations: ', locations);
  return { type: FETCH_WEATHER, payload: weather };
}

export function getWeather(queryCity, units="I") {
  const WEATHER_URL = `https://api.weatherbit.io/v2.0/current?city=${queryCity}&key=${WEATHER_KEY}&units=${units}`;
  // console.log('getWeather called: ', WEATHER_URL);
  return (dispatch) => {
    axios.get(WEATHER_URL)
    .then((res) => {
      console.log('response111 is: ', res.data.data[0]);

      const response = res && res.data && res.data.data && res.data.data[0];
      if (response) {
        dispatch(fetchWeather(response));
      } else {
        // nb???
        throw new Error("not a valid city")
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
  // console.log('fetchStock ___: ', stockData);
  return { type: FETCH_STOCK, payload: stockData };
}

export function getStock(stockSymbol = 'AMZN') {
  const STOCK_URL = `https://api.iextrading.com/1.0/stock/${stockSymbol}/quote`;
  // console.log('getStock called: ', WEATHER_URL);
  return (dispatch) => {
    axios.get(STOCK_URL)
    .then((res) => {
      console.log('stock response is: ', res.data);

      // const response = res && res.data && res.data.data && res.data.data[0];
      if (res) {
        dispatch(fetchStock(res.data));
      }
    })
    .catch((error) => {
      dispatch(applicationError(error));
      console.error("Error getting stock data: ", error);  //eslint-disable-line no-console
    });
  }
}

/*
      JOKE actions
*/
export function fetchCurrency(currencyData) {
  // console.log('fetchLocations: ', locations);
  return { type: FETCH_CURRENCY, payload: currencyData };
}

export function getCurrency(currencySymbol='USD') {
  const CURRENCY_URL = `https://api.fixer.io/latest?base=${currencySymbol}`;
  // console.log('getWeather called: ', WEATHER_URL);
  return (dispatch) => {
    axios.get(CURRENCY_URL)
    .then((res) => {
      // console.log('currency res is: ', res.data);
      dispatch(fetchCurrency(res.data));
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
export function attachToLane(laneId, cardId) {
  return {
    type: ATTACH_TO_LANE,
    laneId,
    cardId
  };
}
export function detachFromLane(laneId, cardId) {
  return {
    type: DETACH_FROM_LANE,
    laneId,
    cardId
  };
}

export function move({ sourceId, targetId }) {
  return {
    type: MOVE,
    sourceId,
    targetId
  };
}

export function updateLane(updatedLane) {
  return {
    type: UPDATE_LANE,
    ...updatedLane
  };
}



/*
      MAP actions
*/
//
//
// export function addedLocation() {
//   console.log('addedLocation:');
//   return getLocations(); // better way of doing this? (probably). not using ADD_LOCATION...
// }




// export function addMap({ name, description, lng, lat, address  }) {
//
//   if (!name || !description || !lng || !lat || !address) {
//     const err = "Location not filled out correctly";
//     console.error('Add location error: ', err);
//     // dispatch(applicationError(err));
//     // throw new Error("Not good");
//     return;
//   }


//   return function(dispatch) {
//     axios.post(`${ROOT_URL}add-map`, {
//       user, // needed nb???
//       name,
//       description,
//       lng,
//       lat,
//       address
//       // slug,
//       // tags,
//       // photo,
//     }, {
//       headers: { authorization: localStorage.getItem('token') }
//   })
//     .then(response => {
//       console.log('the addmap response ', response);
//       dispatch(addedLocation());
//     })
//     .catch(error => {
//       console.log('error', error);
//       try {
//         const err = error && error.response && error.response.data && error.response.data.error;
//         dispatch(authError(err));
//       } catch(err2) {
//         dispatch(authError("Error occured: ", JSON.stringify(err2)));
//       }
//     })
//   }
// }


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





// There are three possible states for our login
// process and we need actions for each of them
// export const LOGIN_REQUEST = 'LOGIN_REQUEST'
// export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
// export const LOGIN_FAILURE = 'LOGIN_FAILURE'
//
// function requestLogin(creds) {
//   return {
//     type: LOGIN_REQUEST,
//     isFetching: true,
//     isAuthenticated: false,
//     creds
//   }
// }
//
// function receiveLogin(user) {
//   return {
//     type: LOGIN_SUCCESS,
//     isFetching: false,
//     isAuthenticated: true,
//     id_token: user.id_token
//   }
// }
//
// function loginError(message) {
//   return {
//     type: LOGIN_FAILURE,
//     isFetching: false,
//     isAuthenticated: false,
//     message
//   }
// }
