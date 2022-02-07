import React from 'react';
import styled from 'styled-components';
import ChampionItem from './ChampionItem';

const ChampionList = ({ championsData, width, size, isDetail }) => {
  return (
    <Wrapper width={width} isDetail={isDetail}>
      {championsData.map((champion, idx) => (
        <ChampionItem size={size} key={idx} championData={champion} />
      ))}
    </Wrapper>
  );
};

export default ChampionList;

const Wrapper = styled.div`
  display: flex;
  width: ${({ width }) => (width ? width : '50%')};
  overflow-x: auto;
  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background-color: #eaeaea;
    border-radius: 100px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #bcbcbc;
    border-radius: 100px;
  }

  @media (max-width: 1050px) {
    width: ${({ isDetail }) => (isDetail ? '45%' : '100%')};
  }
`;
