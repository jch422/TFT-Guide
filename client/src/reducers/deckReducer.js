import { SAVE_DECK } from '../actions/index';

const SLOT_NUM = 12;
const emptySlot = {
  name: '',
  kr_name: '',
  championId: '',
  cost: 0,
  traits: [],
};
const initialSlots = Array.from({ length: SLOT_NUM }, () => ({ ...emptySlot }));
const initialState = {
  deck: initialSlots,
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
