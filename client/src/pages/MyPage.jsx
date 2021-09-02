import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import DeckBox from '../components/Mypage/Deck';

const storedDeck = [
  ['TFT5_Aatrox', 'TFT5_Ivern', 'TFT5_Irelia', 'TFT5_Kalista', 'TFT5_Karma'],
  ['TFT5_Kayle', 'TFT5_Kennen', 'TFT5_Khazix', 'TFT5_Lucian', 'TFT5_MissFortune', 'TFT5_Lux'],
  ['TFT5_LeeSin', 'TFT5_Lissandra', 'TFT5_Udyr', 'TFT5_Nocturne', 'TFT5_Lucian'],
];
const Body = styled.body`
  background-color: #fbed0b;
  height: 100vh;
`;

const P = styled.p`
  padding: 40px;
  font-size: 30px;
  font-family: Helvetica;
  color: #dc44c3;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
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
            <DeckBox data={data} index={index} />
          ))}
        </DeckList>
      </div>
    </Body>
  );
}

export default MyPage;
