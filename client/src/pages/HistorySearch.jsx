import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';

import { setLoader } from '../actions';
import MatchList from '../components/History/MatchList';
import Search from '../components/Search';
import SpinnerPortal from '../components/SpinnerPortal';
import useInfiniteScroll from '../hooks/useInfiniteScroll';

function HistorySearch() {
  const dispatch = useDispatch();
  const { isDark } = useSelector(state => state.themeReducer);
  const { isLoading } = useSelector(state => state.loaderReducer);

  const offsetRef = useRef(0);
  const fetchMoreRef = useRef();
  const hasNextRef = useRef(false);
  const puuidRef = useRef(null);
  const inputRef = useRef();

  const [intersecting] = useInfiniteScroll(fetchMoreRef);
  const [matchesData, setMatchesData] = useState([]);

  const getData = useCallback(
    async (isNewSearch, summonerId) => {
      try {
        dispatch(setLoader(true));
        const {
          data: { data },
        } = await axios.get(
          `${process.env.REACT_APP_SERVER_URI}/matches/${
            summonerId ? summonerId : inputRef.current.name
          }/${offsetRef.current}`,
        );

        dispatch(setLoader(false));
        hasNextRef.current = data.matchesData.length === 10;
        offsetRef.current++;
        if (isNewSearch) {
          puuidRef.current = data.puuid;
          setMatchesData(data.matchesData);
        } else {
          setMatchesData(prevMatchesData => [...prevMatchesData, ...data.matchesData]);
        }
      } catch ({ response: { status } }) {
        if (status === 404) {
          alert('존재하지 않는 소환사명입니다!');
        }
        if (status === 429) {
          alert('잠시후에 다시 시도해주세요!');
        }
      } finally {
        if (summonerId) {
          inputRef.current.setName(summonerId);
          window.scrollTo(0, 0);
        }
        dispatch(setLoader(false));
      }
    },
    [dispatch],
  );

  const handleSearch = useCallback(
    summonerId => {
      offsetRef.current = 0;
      getData(true, summonerId);
    },
    [getData],
  );

  useEffect(() => {
    if (hasNextRef.current && intersecting) {
      getData();
    }
  }, [intersecting, getData]);

  return (
    <Wrapper id="history-search-container" isDark={isDark}>
      {/* <Search ref={inputRef} handleSearch={handleSearch} name={name} setName={setName} isDark={isDark} /> */}
      <Search ref={inputRef} handleSearch={handleSearch} isDark={isDark} />
      {isLoading && <SpinnerPortal />}
      <MatchList
        isDark={isDark}
        handleSearch={handleSearch}
        matchesData={matchesData}
        setMatchesData={setMatchesData}
        puuid={puuidRef.current}
      />
      <FetchMoreDiv ref={fetchMoreRef} />
    </Wrapper>
  );
}

export default HistorySearch;

const Wrapper = styled.div`
  margin: 0;
  background-color: ${({ isDark }) => (isDark ? '#36393f' : '#faf8ff')};
  min-height: calc(100vh - 60px);
  padding-top: 1.5rem;
`;

const FetchMoreDiv = styled.div`
  height: 1px;
`;
