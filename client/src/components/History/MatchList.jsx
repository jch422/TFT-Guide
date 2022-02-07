import React from 'react';
import styled from 'styled-components';

import MatchItem from './MatchItem';

const MatchList = ({ isDark, handleSearch, matchesData, setMatchesData, puuid }) => {
  return (
    <Wrapper>
      {matchesData.map((matchData, idx) => (
        <MatchItem
          key={puuid + idx}
          idx={idx}
          isDark={isDark}
          handleSearch={handleSearch}
          matchData={matchData}
          setMatchesData={setMatchesData}
          puuid={puuid}
        />
      ))}
    </Wrapper>
  );
};

export default MatchList;

const Wrapper = styled.div`
  margin-top: 2rem;
`;
