import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import exercises from './exercises';
import muscles from './muscles';
import equipment from './equipment';
import auth from './auth';

const rootReducer = combineReducers({
  exercises,
  muscles,
  equipment,
  auth,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const storeEnhancer = composeEnhancers(applyMiddleware(thunk));

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, storeEnhancer);
}
