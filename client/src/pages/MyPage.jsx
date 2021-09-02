import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import DeckBox from '../components/Mypage/Deck';

const Body = styled.div`
  background-color: #fbed0b;
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
  const storedMyDeck = useSelector(state => state.decksReducer);
  let storedMyDeckName = [];
  for (let i = 0; i < storedMyDeck.length; i++) {
    storedMyDeckName.push(storedMyDeck[i]['championId']);
  }

  return (
    <Body>
      <P>My Deck</P>
      <div>
        <DeckList>
          {storedMyDeckName.map((data, index) => (
            <DeckBox data={data} index={index} key={index} />
          ))}
        </DeckList>
      </div>
    </Body>
  );
}

export default MyPage;
