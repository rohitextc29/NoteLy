import { createStore, applyMiddleware, compose } from 'redux'
import appReducer from '../reducer';
import ReduxThunk from 'redux-thunk';

export default () => {
  const appStore = createStore(
    appReducer,
    applyMiddleware(ReduxThunk)
  );
  return appStore
}