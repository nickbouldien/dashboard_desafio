import { APP_ERROR } from '../actions/actionTypes';

const errorReducer = (state = "", action) => {
  switch(action.type) {
    case APP_ERROR:
      const newError = action.payload;
      return { ...state, newError };
    // case AUTH_ERROR:
    //   const newError = action.payload;
    //   return { ...state, newError };
    default:
      return state;
  }
}

export default errorReducer;
