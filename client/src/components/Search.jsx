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
      <div>소환사 전적 검색</div>
      <input
        id="search-id"
        type="text"
        name="name"
        placeholder="소환사명"
        onKeyPress={OnKeyPressSearch}
      ></input>
      <button onClick={searchButtonClickSearch}>
        <i className="fas fa-search"></i>
      </button>
    </Div>
  );
}

export default Search;

const Div = styled.div`
  padding: 0.5rem;
  margin-bottom: 1rem;
  width: 100%;
  margin: 0 auto;
  list-style-type: none;
  background: #ffffff;
  border: solid rgb(238, 238, 238) 0.2rem;
  display: flex;
  max-width: 800px;
  min-width: 500px;
  input {
    width: 100%;
    margin: 0 auto;
  }
`;
