import styled from 'styled-components';

import ChampionBox from './ChampionBox.jsx';

const ChampionList = ({ champions }) => {
  const scrollable = champions.length > 10;
  return (
    <ChampionsContainer>
      {champions.map((champion, idx) => (
        <ChampionBox key={idx} {...champion} champion={champion} scrollable={scrollable} />
      ))}
    </ChampionsContainer>
  );
};

const ChampionsContainer = styled.div`
  display: flex;
  height: 56px;
  max-width: 560px;
  overflow-x: auto;

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: #eaeaea;
    border-radius: 100px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #bcbcbc;
    border-radius: 100px;
  }

  @media (max-width: 1200px) {
    padding-left: 1.5rem;
    align-items: center;
  }

  @media (max-width: 700px) {
    max-width: 424px;
  }
`;

export default ChampionList;
