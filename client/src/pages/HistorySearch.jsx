import React, { useState, useEffect } from 'react';
import axios from 'axios';
import History from '../components/History/History';
import Search from '../components/Search';
import styled from 'styled-components';

function HistorySearch() {
  const [isName, setIsName] = useState('');
  const [isData, setIsData] = useState(null);
  // const [puuid, setPuuid] = useState('');

  const onKeyPress = e => {
    if (e.key === 'Enter') {
      setIsName(e.target.value);
    }
  };
  const searchButtonClick = e => {
    setIsName(e.target.value);
  };
  const getData = async () => {
    console.log(isName);
    const res = await axios.get(`http://localhost:8000/matches/${isName}`);
    let matchesData = res.data.data.matchesData;
    for (let i = 0; i < matchesData.length; i++) {
      delete matchesData[i].metadata;
    }
    setIsData({ data: matchesData, puuid: res.data.data.puuid });
  };
  useEffect(() => {
    getData();
  }, [isName]);

  return (
    <Div id="history-search-container">
      <Search onKeyPress={onKeyPress} searchButtonClick={searchButtonClick} />
      {isData?.data?.length > 0 ? (
        <div id="history-summary-body">
          {isData.data.map((data, index) => (
            <History data={data} key={index} puuid={isData.puuid} />
          ))}
        </div>
      ) : null}
    </Div>
  );
}

export default HistorySearch;

const Div = styled.div``;
