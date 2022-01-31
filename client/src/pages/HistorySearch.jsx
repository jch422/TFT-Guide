import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';

import { setLoader } from '../actions';
import History from '../components/History/History';
import Search from '../components/Search';
import Spinner from '../components/Spinner';

function HistorySearch() {
  const [name, setName] = useState('');
  const [data, setData] = useState(null);
  const { isDark } = useSelector(state => state.themeReducer);
  const { isLoading } = useSelector(state => state.loaderReducer);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      setData(null);
      dispatch(setLoader(true));
      const res = await axios.get(`${process.env.REACT_APP_SERVER_URI}/matches/${name}`);
      dispatch(setLoader(false));
      let matchesData = res.data.data.matchesData;
      for (let i = 0; i < matchesData.length; i++) {
        delete matchesData[i].metadata;
      }
      setData({ data: matchesData, puuid: res.data.data.puuid });
    } catch (error) {
      if (error.response) {
        alert('존재하지 않는 소환사명입니다.');
      }
    }
  };

  return (
    <Div id="history-search-container" isDark={isDark}>
      <Search handleSearch={getData} setName={setName} isDark={isDark} />
      {isLoading && (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      )}
      {data?.data?.length > 0 && (
        <div id="history-summary-body">
          {data.data.map((_data, index) => {
            if (_data.info.game_datetime > 1626923221434) {
              return <History data={_data} key={index} puuid={data.puuid} isDark={isDark} />;
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
  background-color: ${({ isDark }) => (isDark ? '#36393f' : '#faf8ff')};
  min-height: calc(100vh - 60px);
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 8rem;
`;
