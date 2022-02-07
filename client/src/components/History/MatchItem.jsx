import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';

import Summary from './Summary';
import ChampionList from './ChampionList';
import TraitList from './TraitList';
import MatchDetail from './MatchDetail';
import { saveDeck } from '../../actions';
import { EMPTY_SLOT } from '../../utils/constants';
import championsData from '../../JSON/set6/champions.json';

import { rankColorMapper } from '../../utils/constants';

const MatchItem = ({ isDark, handleSearch, matchData, setMatchesData, puuid, idx }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showDetails, setShowDetails] = useState(false);

  const gameData = matchData.info.participants.filter(p => p.puuid === puuid)[0];
  const summaryData = {
    rank: gameData.placement,
    queue_id: matchData.info.queue_id,
    game_datetime: matchData.info.game_datetime,
    game_playtime: gameData.time_eliminated,
  };

  const handleDeckClick = deck => {
    const proceed = window.confirm('빌드 페이지로 불러오시겠습니까?');
    if (!proceed) return;

    const slots = deck.slice(0, 12).map(champ => {
      const champData = championsData.find(c => c.championId === champ.character_id);
      return { ...champData };
    });
    while (slots.length < 10) {
      slots.push(EMPTY_SLOT);
    }
    dispatch(saveDeck(slots));
    history.push('/');
  };

  return (
    <>
      <Wrapper isDark={isDark}>
        <Bar width={'5px'} color={rankColorMapper(gameData.placement)} />
        <Summary
          handleClick={() => handleDeckClick(gameData.units)}
          isDark={isDark}
          summaryData={summaryData}
        />
        <Content onClick={() => handleDeckClick(gameData.units)}>
          <TraitList traitsData={gameData.traits} />
          <ChampionList championsData={gameData.units} />
        </Content>
        <Bar
          onClick={() => setShowDetails(v => !v)}
          width={'30px'}
          color={rankColorMapper(gameData.placement)}
          clickable={true}
        >
          <IconWrapper>
            {showDetails ? <IoIosArrowUp color="white" /> : <IoIosArrowDown color="white" />}
          </IconWrapper>
        </Bar>
      </Wrapper>
      {showDetails && (
        <MatchDetail
          idx={idx}
          isDark={isDark}
          handleSearch={handleSearch}
          handleDeckClick={handleDeckClick}
          matchData={matchData}
          setMatchesData={setMatchesData}
          puuid={puuid}
        />
      )}
    </>
  );
};

export default MatchItem;

const Wrapper = styled.div`
  display: flex;
  min-height: 100px;
  align-items: center;
  width: 70%;
  min-width: 1000px;
  margin: 0.5rem auto;
  background-color: ${({ isDark }) => (isDark ? '#4a4c52' : '#dbdbdb')};
  &:hover {
    background-color: ${({ isDark }) => (isDark ? '#6e6f74' : '#e9e9e9')};
    cursor: pointer;
  }
  @media (max-width: 1050px) {
    min-height: 150px;
    min-width: 0px;
    width: 100%;
  }
`;

const Bar = styled.span`
  display: inline-block;
  width: ${({ width }) => width};
  height: 100px;
  background-color: ${({ color }) => color};
  cursor: ${({ clickable }) => clickable && 'pointer'};
  @media (max-width: 1050px) {
    min-height: 150px;
  }
`;

const IconWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const Content = styled.div`
  display: flex;
  width: calc(100% - 155px);
  @media (max-width: 1050px) {
    flex-direction: column;
    & > div {
      margin: 0.3rem 0;
    }
  }
`;
