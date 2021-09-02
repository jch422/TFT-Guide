import { LOAD_DECKS } from '../actions/index';

const initialState = {
  decks: [],
};

const decksReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_DECKS:
      return {
        ...state,
        decks: [...action.payload.decks],
      };
    default:
      return state;
  }
};

export default decksReducer;
