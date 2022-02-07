import styled from 'styled-components';

import ChampionBox from './ChampionBox.jsx';

const ChampionList = ({
  isDark,
  sortOption,
  setSortOption,
  champions,
  handleClick,
  handleDragStart,
  handleDragEnd,
}) => {
  const COL_NUM = 10;
  const ROW_NUM = Math.ceil(champions.length / COL_NUM);

  const sortBtns = [
    { sortOption: 'kr_name', text: '이름순' },
    { sortOption: 'cost', text: '가격순' },
  ];

  return (
    <Wrapper>
      <SortBtnsContainer>
        {sortBtns.map(sortBtn => (
          <SortBtn
            key={sortBtn.sortOption}
            onClick={() => setSortOption(sortBtn.sortOption)}
            isDark={isDark}
            active={sortOption === sortBtn.sortOption}
          >
            {sortBtn.text}
          </SortBtn>
        ))}
      </SortBtnsContainer>
      <ChampionsContainer colNum={COL_NUM} rowNum={ROW_NUM}>
        {champions.map((champion, idx) => (
          <ChampionBox
            key={idx}
            {...champion}
            champion={champion}
            handleClick={handleClick}
            handleDragStart={e => handleDragStart(e, idx)}
            handleDragEnd={handleDragEnd}
          />
        ))}
      </ChampionsContainer>
    </Wrapper>
  );
};

export default ChampionList;

const Wrapper = styled.div`
  margin-top: 2rem;
  @media (max-width: 1200px) {
    margin-top: 1rem;
  }
`;

const ChampionsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ colNum }) => colNum}, minmax(50px, 4vw));
  grid-template-rows: repeat(${({ rowNum }) => rowNum}, minmax(50px, 4vw));
  /* margin-top: 2rem; */
  /* @media (max-width: 1200px) {
    margin-top: 1rem;
  } */
  @media (max-width: 550px) {
    grid-template-columns: repeat(${({ colNum }) => colNum}, 46px);
    grid-template-rows: repeat(${({ rowNum }) => rowNum}, 46px);
  }
`;

const SortBtnsContainer = styled.div`
  //border: 1px solid yellow;
  display: flex;
`;

const SortBtn = styled.div`
  color: ${({ isDark }) => (isDark ? ' white' : '#4c4c4c')};
  //background-color: transparent;
  background-color: ${({ isDark, active }) =>
    isDark && active ? '#787f8c' : !isDark && active ? '#ded3c6' : 'transparent'};
  padding: 5px 5px;
  border: 1px solid ${({ isDark }) => (isDark ? '#787f8c' : '#ded3c6')};
  border-radius: 3px;
  margin-right: 5px;
  margin-bottom: 5px;
  &:hover {
    cursor: pointer;
    background-color: ${({ isDark }) => (isDark ? '#787f8c' : '#ded3c6')};
  }
`;
