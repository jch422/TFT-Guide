import React from 'react';
import styled from 'styled-components';

import { calcDateDiffToString, secToMin } from '../../utils/date';
import { rankColorMapper } from '../../utils/constants';

const Summary = ({ isDark, summaryData, handleClick }) => {
  const { rank, queue_id, game_playtime, game_datetime } = summaryData;

  return (
    <Wrapper onClick={handleClick} isDark={isDark}>
      <Rank color={rankColorMapper(rank)}>#{rank}</Rank>
      <QueueType>{queueType[queue_id]}</QueueType>
      <PlayTime>{secToMin(game_playtime)}</PlayTime>
      <Date>{calcDateDiffToString(game_datetime)}</Date>
    </Wrapper>
  );
};

export default Summary;

const queueType = {
  1090: '일반',
  1100: '랭크',
  1150: '더블 업',
};

const Wrapper = styled.div`
  color: ${({ isDark }) => (isDark ? 'white' : '#464646')};
  margin-left: 20px;
  min-width: 100px;
  & > div {
    margin: 5px 0;
  }
`;

const Rank = styled.div`
  color: ${({ color }) => color};
  font-weight: bold;
  font-size: 1.2rem;
`;
const QueueType = styled.div``;
const PlayTime = styled.div``;
const Date = styled.div``;
