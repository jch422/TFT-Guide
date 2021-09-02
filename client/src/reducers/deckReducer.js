import { SAVE_DECK } from '../actions/index';

const initialState = {
  deck: [],
};

const deckReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_DECK:
      return {
        ...state,
        deck: [...action.payload.deck],
      };
    default:
      return state;
  }
};

export default deckReducer;
