import React from 'react';
import styled from 'styled-components';

function Search({ handleSearch, setName, isDark }) {
  const handleEnter = ({ key }) => {
    if (key === 'Enter') {
      //handleSearch();
      alert('TFT 시즌5 전적은 현재 검색할 수 없습니다. \n업데이트를 기다려주세요!');
    }
  };
  const searchButtonClickSearch = e => {
    //handleSearch();
    alert('TFT 시즌5 전적은 현재 검색할 수 없습니다. \n업데이트를 기다려주세요!');
  };

  return (
    <Div isDark={isDark}>
      <input
        id="search-id"
        type="text"
        name="name"
        placeholder="소환사명"
        onKeyDown={handleEnter}
        onChange={e => setName(e.target.value)}
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
  background-color: ${({ isDark }) => (isDark ? '#36393f' : '#fbed0b')};
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
    font-size: 1.6rem;
  }
  input::placeholder {
    text-align: center;
  }
`;

const Button = styled.button`
  width: 30px;
  height: 30px;
`;

const Img = styled.img`
  width: 15px;
  height: 15px;
`;
