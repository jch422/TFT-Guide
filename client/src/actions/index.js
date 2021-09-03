// action types
export const UPDATE_USERINFO = 'UPDATE_USERINFO';
export const RESET_USERINFO = 'RESET_USERINFO';
export const SAVE_DECK = 'SAVE_DECK';
export const LOAD_DECKS = 'LOAD_DECKS';
export const TOGGLE_MODE = 'TOGGLE_MODE';
export const SET_LOADER = 'SET_LOADER';

// actions creator functions - UserInfo
export const updateUserInfo = userInfo => {
  return {
    type: UPDATE_USERINFO,
    payload: { userInfo },
  };
};

export const resetUserInfo = () => {
  return {
    type: RESET_USERINFO,
  };
};

// actions creator functions - Deck
export const saveDeck = deck => {
  return {
    type: SAVE_DECK,
    payload: { deck },
  };
};

// actions creator functions - Decks(서버에 저장한 Decks)
export const loadDecks = decks => {
  return {
    type: LOAD_DECKS,
    payload: { decks },
  };
};

export const toggleMode = () => {
  return {
    type: TOGGLE_MODE,
  };
};

export const setLoader = isLoading => {
  return {
    type: SET_LOADER,
    payload: { isLoading },
  };
};
