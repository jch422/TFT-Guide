import styled from 'styled-components';

import traitMapper from '../../utils/trait';

const RecommendItem = ({
  kr_name,
  championId,
  cost,
  isDark,
  championData,
  handleRecommendItemClick,
}) => {
  const color = costColorMapper[cost];

  return (
    <Wrapper onClick={() => handleRecommendItemClick(championData)}>
      <ChampionContainer borderColor={color}>
        <ChampionImg src={`../TFTData/champions/${championId}.png`} />
        <ChampionCost bgColor={color}>${cost}</ChampionCost>
        <ChampionName>{kr_name}</ChampionName>
      </ChampionContainer>
      <Traits>
        {championData.traits.map(trait => (
          <Trait color={isDark ? 'white' : '#5F5C6D'}>{traitMapper[trait]}</Trait>
        ))}
      </Traits>
    </Wrapper>
  );
};

const costColorMapper = {
  1: '#808080',
  2: '#11b288',
  3: '#207ac7',
  4: '#c440da',
  5: '#ffb93b',
};

const Wrapper = styled.div`
  display: flex;
  width: 16rem;
  margin-bottom: 1rem;
  padding: 1px;
  transition: transform 0.2s;
  & {
    cursor: pointer;
  }
  &:hover {
    transform: scale(1.1);
  }
  @media (max-width: 1200px) {
    width: 85px;
    height: 85px;
    margin: 0;
  }
`;

const ChampionContainer = styled.div`
  position: relative;
  border: 2px solid ${({ borderColor }) => borderColor};
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 1200px) {
    width: 100%;
    height: 100%;
  }
`;

const ChampionImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

const ChampionCost = styled.div`
  position: absolute;
  top: 0;
  right: -2px;
  color: white;
  width: 30%;
  background-color: ${({ bgColor }) => bgColor};
  border-top-right-radius: 10px;
  text-align: center;
  font-size: 0.8rem;
`;

const ChampionName = styled.div`
  position: absolute;
  color: white;
  bottom: 0.3rem;
  font-size: 0.8rem;
  font-weight: bold;
  text-shadow: 2px 2px 1px black;
`;

const Traits = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-left: 0.5rem;
  @media (max-width: 1200px) {
    display: none;
  }
`;

const Trait = styled.div`
  color: ${({ color }) => color};
  font-weight: bold;
`;

export default RecommendItem;
