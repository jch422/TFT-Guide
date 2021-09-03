import { combineReducers } from 'redux';
import deckReducer from './deckReducer';
import decksReducer from './decksReducer';
import userInfoReducer from './userInfoReducer';
import themeReducer from './themeReducer';
import loaderReducer from './loaderReducer';

const rootReducer = combineReducers({
  deckReducer,
  decksReducer,
  userInfoReducer,
  themeReducer,
  loaderReducer,
});

export default rootReducer;
