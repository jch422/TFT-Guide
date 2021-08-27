import React, { useState } from 'react';
import styled from 'styled-components';

function Navbar(props) {
  const Header = styled.header`
    // styled 어떻게 써야되지???
    height: 5vh;
    font-size: 5vh;
    align-items: center;
    background-color: #0d2e41;
    display: flex;
    justify-content: center;
  `;
  const Span = styled.span`
    font-size: 4vh;
    font-family: Impact;
    color: #fbed0b;
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000,
      4px 2px 0px #00f0ff, 8px 4px 0px #80ff02;
    padding: 1vh;
    align-content: center;
    &:hover {
      color: #dc44c3;
      cursor: pointer;
    }
  `;
  const goToMain = () => {
    props.setCurrent('main');
    console.log(props.current);
  };
  const goToMypage = () => {
    props.setCurrent('mypage');
    console.log(props.current);
  };
  const goToSearch = () => {
    props.setCurrent('search');
    console.log(props.current);
  };
  return (
    <Header>
      <Span className="toMain" onClick={() => goToMain()}>
        Main
      </Span>
      <Span className="toMypage" onClick={() => goToMypage()}>
        Mypage
      </Span>
      <Span className="toSearch" onClick={() => goToSearch()}>
        Search
      </Span>
    </Header>
  );
}

export default Navbar;
