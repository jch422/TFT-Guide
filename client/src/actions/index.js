// action types
export const UPDATE_USERINFO = 'UPDATE_USERINFO';
export const RESET_USERINFO = 'RESET_USERINFO';
export const ADD_TO_DECK = 'ADD_TO_DECK';
export const REMOVE_FROM_DECK = 'REMOVE_FROM_DECK';

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
export const addToDeck = championId => {
  return {
    type: ADD_TO_DECK,
    payload: { championId },
  };
};

export const removeFromDeck = championId => {
  return {
    type: REMOVE_FROM_DECK,
    payload: { championId },
  };
};
