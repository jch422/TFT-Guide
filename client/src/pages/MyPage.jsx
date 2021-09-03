import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import DeckBox from '../components/Mypage/Deck';

const Body = styled.div`
  background-color: ${({ isDark }) => (isDark ? '#36393f' : '#fbed0b')};
  height: 100vh;
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
  const { isDark } = useSelector(state => state.themeReducer);
  const savedDecks = useSelector(state => state.decksReducer.decks);
  const myDeck = savedDecks.map(({ Champion }) => Champion.map(({ id }) => id));

  return (
    <Body isDark={isDark}>
      <P>My Deck</P>
      <div>
        <DeckList>
          {myDeck.map((data, index) => (
            <DeckBox data={data} index={index} key={index} isDark={isDark} />
          ))}
        </DeckList>
      </div>
    </Body>
  );
}

export default MyPage;
