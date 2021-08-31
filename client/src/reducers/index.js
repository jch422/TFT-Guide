import { combineReducers } from 'redux';
import deckReducer from './deckReducer';
import userInfoReducer from './userInfoReducer';

const rootReducer = combineReducers({
  deckReducer,
  userInfoReducer,
});

export default rootReducer;
