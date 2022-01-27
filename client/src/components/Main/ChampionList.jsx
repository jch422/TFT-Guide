import styled from 'styled-components';

import ChampionBox from './ChampionBox.jsx';

const ChampionList = ({ champions, handleClick, handleDragStart, handleDragEnd }) => {
  const COL_NUM = 10;
  const ROW_NUM = Math.ceil(champions.length / COL_NUM);

  return (
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
  );
};

const ChampionsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ colNum }) => colNum}, minmax(50px, 4vw));
  grid-template-rows: repeat(${({ rowNum }) => rowNum}, minmax(50px, 4vw));
  margin-top: 2rem;
  @media (max-width: 1200px) {
    margin-top: 1rem;
  }
  @media (max-width: 550px) {
    grid-template-columns: repeat(${({ colNum }) => colNum}, 46px);
    grid-template-rows: repeat(${({ rowNum }) => rowNum}, 46px);
  }
`;

export default ChampionList;
