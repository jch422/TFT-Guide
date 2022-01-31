import styled from 'styled-components';

import ChampionBox from './ChampionBox.jsx';

const ChampionList = ({ champions }) => {
  return (
    <ChampionsContainer>
      {champions.map((champion, idx) => (
        <ChampionBox key={idx} {...champion} champion={champion} />
      ))}
    </ChampionsContainer>
  );
};

const ChampionsContainer = styled.div`
  display: flex;
  height: 56px;
  @media (max-width: 1200px) {
    padding-left: 1.5rem;
    align-items: center;
  }
`;

export default ChampionList;
