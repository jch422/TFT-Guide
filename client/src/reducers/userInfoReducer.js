import { UPDATE_USERINFO, RESET_USERINFO } from '../actions/index';

export const USER_INFO_STATE = 'userInfoState';

const initialState = {
  id: null,
  email: null,
  picture: null,
  riotId: null,
  isRegistered: false,
  accessToken: null,
};

const getInitialState = () => {
  const loadedState = localStorage.getItem(USER_INFO_STATE);
  if (loadedState) {
    return JSON.parse(loadedState);
  }
  return initialState;
};

const userInfoReducer = (state = getInitialState(), action) => {
  switch (action.type) {
    case UPDATE_USERINFO:
      return {
        ...state,
        ...action.payload.userInfo,
      };
    case RESET_USERINFO:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default userInfoReducer;
