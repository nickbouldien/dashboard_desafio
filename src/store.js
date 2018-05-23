import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import throttle from 'lodash/throttle';
import rootReducer from './reducers/root_index';
import { loadState, saveState } from './localStorage';

const configureStore = () => {

  const persistedState = loadState();

  const store = createStore(
    rootReducer,
    persistedState,
    compose(
      applyMiddleware(thunk),
      typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
    )
  );

  store.subscribe(throttle(() => {
    saveState({
      weather: store.getState().weather,
      laneReducer: store.getState().laneReducer,
      stocks: store.getState().stocks,
      currencies: store.getState().currencies,
    });
  }), 1000);

  return store;
}


export default configureStore;
