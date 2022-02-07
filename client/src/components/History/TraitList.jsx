import React from 'react';
import TraitItem from './TraitItem';
import styled from 'styled-components';

const TraitList = ({ traitsData, size, width, isDetail }) => {
  const traitItems = traitsData
    .filter(trait => trait.style > 0)
    .sort((a, b) => b.style - a.style)
    .map(({ name, style }, idx) => <TraitItem key={idx} trait={name} style={style} size={size} />);

  return (
    <Wrapper width={width} isDetail={isDetail}>
      {traitItems}
    </Wrapper>
  );
};

export default TraitList;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: ${({ width }) => (width ? width : '45%')};
  height: ${({ size }) => size + 'px'};

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
    width: ${({ isDetail }) => (isDetail ? '35%' : '100%')};
  }
`;
