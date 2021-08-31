import { ADD_TO_DECK, REMOVE_FROM_DECK } from '../actions/index';

const initialState = {
  deckId: 0,
  deck: [],
};

const deckReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_DECK:
      return {
        ...state,
        deck: state.deck.concat(action.payload.championId),
      };
    case REMOVE_FROM_DECK:
      return {
        ...state,
        deck: state.deck.filter((_, idx) => idx !== state.deck.indexOf(action.payload.championId)),
      };
    default:
      return state;
  }
};

export default deckReducer;
