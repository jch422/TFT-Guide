import { createStore } from 'redux';

import rootReducer from '../reducers/index';
import { USER_INFO_STATE } from '../reducers/userInfoReducer';

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

store.subscribe(() => {
  const { userInfoReducer } = store.getState();
  localStorage.setItem(USER_INFO_STATE, JSON.stringify(userInfoReducer));
});

export default store;
