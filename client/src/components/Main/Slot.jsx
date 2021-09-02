import styled from 'styled-components';

const Slot = ({
  championId = null,
  kr_name,
  handleDragEnter,
  handleSlotDragStart,
  handleSlotDragEnd,
}) => {
  const url = `url(${process.env.REACT_APP_HOME}/TFTData/champions/${championId}.png)`;

  return championId ? (
    <Hexagon
      url={url}
      draggable
      onDragStart={handleSlotDragStart}
      onDragEnter={handleDragEnter}
      onDragEnd={handleSlotDragEnd}
    >
      <HexTop />
      <HexBottom />
      <ChampionName>{kr_name}</ChampionName>
    </Hexagon>
  ) : (
    <HexagonEmpty onDragEnter={handleDragEnter} />
  );
};

export default Slot;

const Hexagon = styled.div`
  position: relative;
  width: 100px;
  height: 57.74px;
  margin: 28.87px 0;
  background-image: ${({ url }) => url};
  background-size: auto 115.4701px;
  background-position: center;
  &:after {
    content: '';
    position: absolute;
    top: 0px;
    left: 0;
    width: 100px;
    height: 57.735px;
    z-index: 2;
    background: inherit;
  }
  & {
    cursor: pointer;
  }
`;

const Shared = styled.div`
  position: absolute;
  z-index: 1;
  width: 70.71px;
  height: 70.71px;
  overflow: hidden;
  -webkit-transform: scaleY(0.5774) rotate(-45deg);
  -ms-transform: scaleY(0.5774) rotate(-45deg);
  transform: scaleY(0.5774) rotate(-45deg);
  background: inherit;
  left: 14.64px;
`;

const HexTop = styled(Shared)`
  top: -35.3553px;
  &:after {
    content: '';
    position: absolute;
    width: 100px;
    height: 57.73502691896258px;
    -webkit-transform: rotate(45deg) scaleY(1.7321) translateY(-28.8675px);
    -ms-transform: rotate(45deg) scaleY(1.7321) translateY(-28.8675px);
    transform: rotate(45deg) scaleY(1.7321) translateY(-28.8675px);
    -webkit-transform-origin: 0 0;
    -ms-transform-origin: 0 0;
    transform-origin: 0 0;
    background: inherit;
    background-position: center top;
  }
`;

const HexBottom = styled(Shared)`
  bottom: -35.3553px;
  &:after {
    content: '';
    position: absolute;
    width: 100px;
    height: 57.73502691896258px;
    -webkit-transform: rotate(45deg) scaleY(1.7321) translateY(-28.8675px);
    -ms-transform: rotate(45deg) scaleY(1.7321) translateY(-28.8675px);
    transform: rotate(45deg) scaleY(1.7321) translateY(-28.8675px);
    -webkit-transform-origin: 0 0;
    -ms-transform-origin: 0 0;
    transform-origin: 0 0;
    background: inherit;
    background-position: center bottom;
  }
`;

const ChampionName = styled.div`
  position: absolute;
  top: 2rem;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;

  color: white;
  font-weight: bold;
  text-shadow: 2px 2px 1px black;
`;

const HexagonEmpty = styled.div`
  position: relative;
  width: 100px;
  height: 57.74px;
  background-color: #0c2e41;
  margin: 28.87px 0;
  &:before,
  &:after {
    content: '';
    position: absolute;
    width: 0;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
  }
  &:before {
    bottom: 100%;
    border-bottom: 28.87px solid #0c2e41;
  }
  &:after {
    top: 100%;
    width: 0;
    border-top: 28.87px solid #0c2e41;
  }
  & {
    cursor: pointer;
  }
`;
