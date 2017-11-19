import axios from 'axios';
import {
  FETCH_WEATHER,
  APP_ERROR
  // AUTH_USER,
  // UNAUTH_USER,
  // AUTH_ERROR,
  // FETCH_LOCATIONS,
  // ADD_LOCATION,
  // SET_SEARCH_TERM
} from './actionTypes';

let ROOT_URL;

if (process.env.NODE_ENV === 'production') {
  ROOT_URL = '/';
} else {
  ROOT_URL = 'http://localhost:3090/';
}

const WEATHER_KEY = process.env.WEATHER_KEY || '2c6d4627538f4d09bf0bf753cab3e0d3';

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
      WEATHER actions
*/
export function fetchWeather(weather) {
  // console.log('fetchLocations: ', locations);
  return { type: FETCH_WEATHER, payload: weather };
}


export function getWeather(queryCity, units="I") {

  const WEATHER_URL = `https://api.weatherbit.io/v2.0/current?city=${queryCity}&key=${WEATHER_KEY}&units=${units}`;

  console.log('getWeather called: ', WEATHER_URL);

  return (dispatch) => {

    axios.get(WEATHER_URL)
    .then((res) => {
      // console.log('response is: ', res.data);
      console.log('response111 is: ', res.data.data[0]);

        dispatch(fetchWeather(res.data.data[0]));
    })
    .catch((error) => {
        // dispatch(applicationError(error));
      console.error("Error getting weather: ", error);  //eslint-disable-line no-console
    });

      // axios.get(`${WEATHER_URL}${query}`)
      // .then(response => {
      //   console.log('the weather response ', response.data);
      //   // if response.status === 200 {  } // .ok
      //   dispatch(fetchWeather(response.data));
      // })
      // .catch(err => {
      //   console.error("Error getting locations: ", err);  //eslint-disable-line no-console
      // })
    }
}




/*
      MAP actions
*/
// export function setSearchTerm(searchTerm) {
//   console.log('setSearchTerm: ', searchTerm);
//   return { type: SET_SEARCH_TERM, payload: searchTerm };
// }
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
