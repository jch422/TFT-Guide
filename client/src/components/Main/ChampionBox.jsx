import styled from 'styled-components';

const ChampionBox = ({ kr_name, championId, cost, handleDragStart, handleDragEnd }) => {
  const color = costColorMapper[cost];

  return (
    <Wrapper>
      <ChampionContainer
        borderColor={color}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <ChampionImg src={`../TFTData/champions/${championId}.png`} />
        <ChampionCost bgColor={color}>${cost}</ChampionCost>
        <ChampionName>{kr_name}</ChampionName>
      </ChampionContainer>
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
  width: 100%;
  height: 100%;
  padding: 1px;
  & {
    cursor: pointer;
  }
`;

const ChampionContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border: 2px solid ${({ borderColor }) => borderColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChampionImg = styled.img`
  width: 100%;
  height: 100%;
`;

const ChampionCost = styled.div`
  position: absolute;
  top: 0;
  right: -2px;
  color: white;
  width: 30%;
  background-color: ${({ bgColor }) => bgColor};
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

export default ChampionBox;
