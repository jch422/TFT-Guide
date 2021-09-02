import styled from 'styled-components';

import ChampionBox from './ChampionBox.jsx';

const ChampionList = ({ champions, handleDragStart, handleDragEnd }) => {
  const COL_NUM = 10;
  const ROW_NUM = Math.ceil(champions.length / COL_NUM);

  return (
    <ChampionsContainer colNum={COL_NUM} rowNum={ROW_NUM}>
      {champions.map((champion, idx) => (
        <ChampionBox
          key={idx}
          {...champion}
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
`;

export default ChampionList;
