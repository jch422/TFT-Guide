import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import Deck from '../components/Mypage/Deck';
import Empty from '../components/Mypage/Empty';

import { loadDecks } from '../actions';

function MyPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isDark } = useSelector(state => state.themeReducer);
  const savedDecks = useSelector(state => state.decksReducer.decks);
  const userInfo = useSelector(state => state.userInfoReducer);

  const getDecks = useCallback(async () => {
    const {
      data: { data },
    } = await axios.get(`${process.env.REACT_APP_SERVER_URI}/decks/${userInfo.id}`);
    dispatch(loadDecks(data));
  }, [dispatch, userInfo.id]);

  const deleteDeck = useCallback(async id => {
    await axios.delete(`${process.env.REACT_APP_SERVER_URI}/decks/${id}`);
    await getDecks();
  }, []);

  useEffect(() => {
    if (userInfo.id) {
      getDecks();
    } else {
      history.push('/login');
    }
  }, [getDecks, userInfo.id]);

  return (
    <Container isDark={isDark}>
      {!!savedDecks.length && (
        <Decks>
          {savedDecks.map((deck, idx) => (
            <Deck order={idx} deck={deck} key={deck.id} deleteDeck={deleteDeck} isDark={isDark} />
          ))}
        </Decks>
      )}
      {!savedDecks.length && <Empty isDark={isDark} />}
    </Container>
  );
}

export default MyPage;

const Container = styled.div`
  background-color: ${({ isDark }) => (isDark ? '#36393f' : '#FAF8FF')};
  min-height: calc(100vh - 60px);
`;

const Decks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
