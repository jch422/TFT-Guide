import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';

import { setLoader } from '../actions';
import History from '../components/History/History';
import Search from '../components/Search';
import Spinner from '../components/Spinner';

function HistorySearch() {
  const [Name, setIsName] = useState('');
  const [Data, setIsData] = useState(null);
  const { isDark } = useSelector(state => state.themeReducer);
  const { isLoading } = useSelector(state => state.loaderReducer);
  const dispatch = useDispatch();

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
      setIsData(null);
      dispatch(setLoader(true));
      const res = await axios.get(`${process.env.REACT_APP_SERVER_URI}/matches/${Name}`);
      dispatch(setLoader(false));
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
    <Div id="history-search-container" isDark={isDark}>
      <Search onKeyPress={onKeyPress} searchButtonClick={searchButtonClick} isDark={isDark} />
      {isLoading && (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      )}
      {Data?.data?.length > 0 && (
        <div id="history-summary-body">
          {Data.data.map((data, index) => {
            if (data.info.game_datetime > 1626923221434) {
              return <History data={data} key={index} puuid={Data.puuid} isDark={isDark} />;
            }
            return <></>;
          })}
        </div>
      )}
    </Div>
  );
}

export default HistorySearch;

const Div = styled.div`
  margin: 0;
  background-color: ${({ isDark }) => (isDark ? '#36393f' : '#fbed0b')};
  height: 120vh;
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 8rem;
`;
