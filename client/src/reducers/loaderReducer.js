import { SET_LOADER } from '../actions/index';

const initialState = {
  isLoading: false,
};

const loaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADER:
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };
    default:
      return state;
  }
};

export default loaderReducer;
