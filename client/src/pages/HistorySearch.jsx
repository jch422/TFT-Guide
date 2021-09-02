import React, { useState, useEffect } from 'react';
import axios from 'axios';
import History from '../components/History/History';
import Search from '../components/Search';
import styled from 'styled-components';

function HistorySearch() {
  const [Name, setIsName] = useState('');
  const [Data, setIsData] = useState(null);

  const onKeyPress = e => {
    if (e.key === 'Enter') {
      setIsName(e.target.value);
    }
  };
  const searchButtonClick = e => {
    setIsName(e.target.value);
  };
  const getData = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_SERVER_URI}/matches/${Name}`);
      let matchesData = res.data.data.matchesData;
      for (let i = 0; i < matchesData.length; i++) {
        delete matchesData[i].metadata;
      }
      setIsData({ data: matchesData, puuid: res.data.data.puuid });
    } catch (error) {
      if (error.response) {
        alert('존재하지 않는 소환사명입니다.');
      }
    }
  };

  useEffect(() => {
    if (Name) {
      getData();
    }
  }, [Name]);

  return (
    <Div id="history-search-container">
      <Search onKeyPress={onKeyPress} searchButtonClick={searchButtonClick} />
      {Data?.data?.length > 0 ? (
        <div id="history-summary-body">
          {Data.data.map((data, index) => {
            if (data.info.game_datetime > 1626923221434) {
              return <History data={data} key={index} puuid={Data.puuid} />;
            }
          })}
        </div>
      ) : null}
    </Div>
  );
}

export default HistorySearch;

const Div = styled.div`
  margin: 0;
  background-color: #fbed0b;
  height: 120vh;
`;
