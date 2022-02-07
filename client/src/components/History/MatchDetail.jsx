import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { RiCoinLine } from 'react-icons/ri';

import TraitList from './TraitList';
import ChampionList from './ChampionList';
import SpinnerPortal from '../../components/SpinnerPortal';
import { secToMin } from '../../utils/date';

const MatchDetail = ({
  idx,
  isDark,
  handleSearch,
  handleDeckClick,
  matchData,
  setMatchesData,
  puuid,
}) => {
  const hasPlayersData = !!matchData?.players;
  const [isLoading, setIsLoading] = useState(!hasPlayersData);

  const handleSummonerSearch = (e, nickname) => {
    e.stopPropagation();
    handleSearch(nickname);
  };

  const getPlayerNames = useCallback(async () => {
    if (matchData.players) return;

    try {
      const playerInfo = await Promise.all(
        matchData.metadata.participants.map(participant => {
          return axios.get(`${process.env.REACT_APP_SERVER_URI}/matches/player/${participant}`);
        }),
      );
      setMatchesData(prevMatchesData =>
        prevMatchesData.map((prevMatchData, matchIdx) => {
          if (idx === matchIdx) {
            prevMatchData.players = playerInfo.reduce((acc, { data: { data } }) => {
              acc[data.puuid] = data.name;
              return acc;
            }, {});
          }
          return prevMatchData;
        }),
      );
    } catch (err) {
      alert('오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, [matchData, idx, setMatchesData]);

  useEffect(() => {
    getPlayerNames();
  }, [getPlayerNames, matchData]);

  return (
    <>
      {isLoading && <SpinnerPortal />}
      {!isLoading && (
        <Wrapper isDark={isDark}>
          <Header isDark={isDark}>
            <div id="rank">등수</div>
            <div id="summoner">소환사</div>
            <div id="playtime">생존시간</div>
            <div id="synergy">시너지</div>
            <div id="champion">챔피언</div>
            <div id="gold">잔여골드</div>
          </Header>
          {matchData.info.participants
            .sort((a, b) => a.placement - b.placement)
            .map((participant, idx) => {
              const nickname = matchData.players?.[participant.puuid];
              return (
                <MatchInfo
                  onClick={() => handleDeckClick(participant.units)}
                  key={idx}
                  isDark={isDark}
                  isTarget={puuid === participant.puuid}
                >
                  <Rank>{participant.placement}</Rank>
                  <Nickname onClick={e => handleSummonerSearch(e, nickname)}>{nickname}</Nickname>
                  <PlayTime>{secToMin(participant.time_eliminated)}</PlayTime>

                  <TraitList
                    width="35%"
                    size={32}
                    traitsData={participant.traits}
                    isDetail={true}
                  />
                  <ChampionList
                    width="43%"
                    size="32px"
                    championsData={participant.units}
                    isDetail={true}
                  />
                  <Gold>
                    <RiCoinLine color={isDark ? 'gold' : 'black'} />
                    <span>{participant.gold_left}</span>
                  </Gold>
                </MatchInfo>
              );
            })}
        </Wrapper>
      )}
    </>
  );
};

export default MatchDetail;

const Wrapper = styled.div`
  width: 70%;
  min-width: 1000px;
  margin: 0 auto;
  background-color: ${({ isDark }) => (isDark ? '#4a4c52' : '#dbdbdb')};
  @media (max-width: 1050px) {
    min-width: 0px;
    width: 100%;
  }
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  height: 30px;
  background-color: ${({ isDark }) => (isDark ? '#252629' : '#d5cabd')};
  min-width: 1000px;
  align-items: center;
  color: ${({ isDark }) => (isDark ? 'white' : '#323232')};
  margin: 0 auto;
  text-align: center;
  font-size: 0.8rem;
  padding: 0 1rem;
  margin-bottom: 1rem;
  & > #rank {
    width: 3%;
    min-width: 26px;
  }
  & > #summoner {
    width: 15%;
  }

  & > #playtime {
    width: 7%;
  }

  & > #synergy {
    width: 35%;
  }
  & > #champion {
    width: 43%;
  }
  & > #gold {
    width: 7%;
  }
  @media (max-width: 1050px) {
    min-width: 0px;
    width: 100%;
    & > #rank {
      width: 5%;
    }
    & > #summoner {
      width: 15%;
    }

    & > #playtime {
      display: none;
    }
    & > #synergy {
      width: 35%;
    }
    & > #champion {
      width: 45%;
    }
    & > #gold {
      display: none;
    }
  }
`;

const MatchInfo = styled.div`
  display: flex;
  width: 100%;
  min-width: 1000px;
  margin: 0 auto;
  align-items: center;
  color: ${({ isDark }) => (isDark ? 'white' : '#323232')};
  padding: 1.2rem 1rem;
  font-size: 0.8rem;
  background-color: ${({ isTarget, isDark }) => isTarget && (isDark ? '#8c8c8c' : '#afafaf')};
  &:hover {
    background-color: ${({ isDark }) => (isDark ? '#6e6f74' : '#e9e9e9')};
    cursor: pointer;
  }

  @media (max-width: 1050px) {
    min-width: 0px;
    width: 100%;
  }
`;

const Rank = styled.div`
  width: 3%;
  text-align: center;
  @media (max-width: 1050px) {
    width: 5%;
  }
`;

const Nickname = styled.div`
  width: 15%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-left: 1rem;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
  @media (max-width: 1050px) {
    width: 15%;
  }
`;

const PlayTime = styled.div`
  width: 7%;
  text-align: center;
  @media (max-width: 1050px) {
    display: none;
  }
`;

const Gold = styled.div`
  width: 7%;
  display: flex;
  justify-content: center;
  align-items: center;
  & > span {
    margin-left: 3px;
  }
  margin-left: auto;
  @media (max-width: 1050px) {
    display: none;
  }
`;
