import { combineReducers } from 'redux';
import deckReducer from './deckReducer';
import decksReducer from './decksReducer';
import userInfoReducer from './userInfoReducer';

const rootReducer = combineReducers({
  deckReducer,
  decksReducer,
  userInfoReducer,
});

export default rootReducer;
