import React from 'react';
import styled from 'styled-components';

function Search({ onChange, onKeyPress, searchButtonClick }) {
  const OnKeyPressSearch = e => {
    onKeyPress(e);
  };
  const searchButtonClickSearch = e => {
    searchButtonClick(e);
  };
  return (
    <Div>
      {/* <Span>소환사 전적 검색</Span> */}
      <input
        id="search-id"
        type="text"
        name="name"
        placeholder="소환사명"
        onKeyPress={OnKeyPressSearch}
      ></input>
      <Button onClick={searchButtonClickSearch}>
        <Img src={'https://svgsilh.com/svg/1093183.svg'}></Img>
      </Button>
    </Div>
  );
}

export default Search;

const Div = styled.div`
  padding: 0.5rem;
  margin-bottom: 1rem;
  width: 100%;
  height: 65px;
  margin: 0 auto;
  list-style-type: none;
  background: #fbed0b;
  display: flex;
  flex-direction: row;
  align-items: center;
  max-width: 800px;
  min-width: 500px;
  input {
    width: 100%;
    height: 100%;
    border-radius: 25px;
    text-align: center;
  }
  input::placeholder {
    text-align: center;
  }
`;

const Button = styled.button`
  width: 30px;
  height: 30px;
`;

const Span = styled.span`
  color: black;
  display: flex;
  font-size: 13px;
  flex: 0 1 130px;
`;

const Img = styled.img`
  width: 15px;
  height: 15px;
`;
