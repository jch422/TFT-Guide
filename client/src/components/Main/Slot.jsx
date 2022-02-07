import styled from 'styled-components';

const Slot = ({
  idx,
  isDark,
  championId = null,
  kr_name,
  name,
  handleDragEnter,
  handleSlotDragStart,
  handleSlotDragEnd,
  handleRemoveFromSlot,
}) => {
  if (name === 'ChoGath') name = 'Chogath';
  const champImgSrc = `url(${process.env.REACT_APP_CHAMP_IMG_SRC}/${name}.png)`;

  return championId ? (
    <Hexagon
      imgSrc={champImgSrc}
      draggable
      onDragStart={handleSlotDragStart}
      onDragEnter={handleDragEnter}
      onDragEnd={handleSlotDragEnd}
      onClick={() => handleRemoveFromSlot(idx)}
    >
      <HexTop />
      <HexBottom />
      <ChampionName>{kr_name}</ChampionName>
    </Hexagon>
  ) : (
    <HexagonEmpty isDark={isDark} onDragEnter={handleDragEnter} />
  );
};

export default Slot;

const Hexagon = styled.div`
  position: relative;
  width: 100px;
  height: 57.74px;
  margin: 28.87px 0;
  background-image: ${({ imgSrc }) => imgSrc};
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
  @media (max-width: 1200px) {
    width: 50px;
    height: 28.87px;
    margin: 14.43px 0;
    background-size: auto 57.735px;
    &:after {
      content: '';
      position: absolute;
      top: 0px;
      left: 0;
      width: 50px;
      height: 28.8675px;
      z-index: 2;
      background: inherit;
    }
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
  @media (max-width: 1200px) {
    position: absolute;
    z-index: 1;
    width: 35.36px;
    height: 35.36px;
    overflow: hidden;
    -webkit-transform: scaleY(0.5774) rotate(-45deg);
    -ms-transform: scaleY(0.5774) rotate(-45deg);
    transform: scaleY(0.5774) rotate(-45deg);
    background: inherit;
    left: 7.32px;
  }
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
  @media (max-width: 1200px) {
    top: -17.6777px;
    &:after {
      content: '';
      position: absolute;
      width: 50px;
      height: 28.86751345948129px;
      -webkit-transform: rotate(45deg) scaleY(1.7321) translateY(-14.4338px);
      -ms-transform: rotate(45deg) scaleY(1.7321) translateY(-14.4338px);
      transform: rotate(45deg) scaleY(1.7321) translateY(-14.4338px);
      -webkit-transform-origin: 0 0;
      -ms-transform-origin: 0 0;
      transform-origin: 0 0;
      background: inherit;
      background-position: center top;
    }
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
  @media (max-width: 1200px) {
    bottom: -17.6777px;
    &:after {
      content: '';
      position: absolute;
      width: 50px;
      height: 28.86751345948129px;
      -webkit-transform: rotate(45deg) scaleY(1.7321) translateY(-14.4338px);
      -ms-transform: rotate(45deg) scaleY(1.7321) translateY(-14.4338px);
      transform: rotate(45deg) scaleY(1.7321) translateY(-14.4338px);
      -webkit-transform-origin: 0 0;
      -ms-transform-origin: 0 0;
      transform-origin: 0 0;
      background: inherit;
      background-position: center bottom;
    }
  }
`;

const ChampionName = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3;
  display: inline-block;
  text-align: center;
  color: white;
  font-weight: bold;
  text-shadow: 2px 2px 1px black;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 auto;

  @media (max-width: 1200px) {
    top: 1.2rem;
    font-size: 0.6rem;
  }
`;

const HexagonEmpty = styled.div`
  position: relative;
  width: 100px;
  height: 57.74px;
  background-color: ${({ isDark }) => (isDark ? '#cccccc' : '#2C2C2C')};
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
    border-bottom: 28.87px solid ${({ isDark }) => (isDark ? '#cccccc' : '#2C2C2C')};
  }
  &:after {
    top: 100%;
    width: 0;
    border-top: 28.87px solid ${({ isDark }) => (isDark ? '#cccccc' : '#2C2C2C')};
  }
  & {
    cursor: pointer;
  }
  @media (max-width: 1200px) {
    width: 50px;
    height: 28.87px;
    margin: 14.43px 0;
    &:before,
    &:after {
      content: '';
      position: absolute;
      width: 0;
      border-left: 25px solid transparent;
      border-right: 25px solid transparent;
    }
    &:before {
      bottom: 100%;
      border-bottom: 14.43px solid ${({ isDark }) => (isDark ? '#cccccc' : '#2C2C2C')};
    }
    &:after {
      top: 100%;
      width: 0;
      border-top: 14.43px solid ${({ isDark }) => (isDark ? '#cccccc' : '#2C2C2C')};
    }
  }
`;
