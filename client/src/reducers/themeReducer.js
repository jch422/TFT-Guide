import { TOGGLE_MODE } from '../actions/index';

const isDark = localStorage.getItem('isDark') ? JSON.parse(localStorage.getItem('isDark')) : true;
const initialState = { isDark };

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_MODE:
      return {
        ...state,
        isDark: !state.isDark,
      };
    default:
      return state;
  }
};

export default themeReducer;
