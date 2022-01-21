import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import DeckBox from '../components/Mypage/Deck';
import { loadDecks } from '../actions';
import axios from 'axios';

const Body = styled.div`
  background-color: ${({ isDark }) => (isDark ? '#36393f' : '#fbed0b')};
  min-height: 100vh;
`;

const P = styled.p`
  padding: 40px;
  font-size: 40px;
  font-family: impact;
  color: #f29766;
  text-shadow: -1px -1px 0 #0c2e41, 1px -1px 0 #0c2e41, -1px 1px 0 #0c2e41, 1px 1px 0 #0c2e41;
  padding: 40px;
  text-align: center;
`;
const DeckList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function MyPage() {
  const dispatch = useDispatch();
  const { isDark } = useSelector(state => state.themeReducer);
  const savedDecks = useSelector(state => state.decksReducer.decks);
  const userInfo = useSelector(state => state.userInfoReducer);
  const myDeck = savedDecks.map(({ Champion, id }) => [...Champion.map(({ id }) => id), id]);

  const getDecks = useCallback(async () => {
    const {
      data: { data },
    } = await axios.get(`${process.env.REACT_APP_SERVER_URI}/decks/${userInfo.id}`);
    dispatch(loadDecks(data));
  }, [dispatch, userInfo.id]);

  useEffect(() => {
    if (userInfo.id) {
      getDecks();
    }
  }, [getDecks, userInfo.id]);

  const deleteDeck = async id => {
    await axios.delete(`${process.env.REACT_APP_SERVER_URI}/decks/${id}`);
    await getDecks();
  };

  return (
    <Body isDark={isDark}>
      <P>My Deck</P>
      <div>
        <DeckList>
          {myDeck.map((deck, index) => (
            <DeckBox
              deck={deck}
              index={index}
              key={deck[deck.length - 1]}
              id={deck[deck.length - 1]}
              isDark={isDark}
              deleteDeck={deleteDeck}
            />
          ))}
        </DeckList>
      </div>
    </Body>
  );
}

export default MyPage;
