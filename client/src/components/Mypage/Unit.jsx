import React from 'react';
import styled from 'styled-components';
import champions from '../../JSON/champions.json';

function Unit({ el }) {
  const imgsrc = '../TFTData/champions/' + el + '.png';
  let kr_name = '';
  for (let j = 0; j < Object.keys(champions).length; j++) {
    if (el === champions[j].championId) {
      kr_name = champions[j].kr_name;
    }
  }

  return (
    <UnitContainer className="unit">
      <ImgContainer className="champion">
        <ChampionImg src={imgsrc}></ChampionImg>
        <TooltipText>{kr_name}</TooltipText>
      </ImgContainer>
    </UnitContainer>
  );
}

export default Unit;

const TooltipText = styled.span`
  /* visibility: hidden; */
  width: auto;
  height: 70%;
  white-space: nowrap;
  background-color: black;
  color: white;
  text-align: center;
  border-radius: 5px;
  padding: 10px 5px;
  position: relative;
  z-index: 1;
  top: 120%;
  font-size: 13px;
  :after {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin-left: -10px;
    border-width: 10px;
    border-style: solid;
    border-color: transparent transparent black transparent;
  }
`;
const ImgContainer = styled.div`
  position: relative;
  display: inline-block;
  display: flex;
  flex-direction: column;
  align-items: center;
  &:hover ${TooltipText} {
    visibility: visible;
  }
`;

const ChampionImg = styled.img`
  height: 40px;
`;
const UnitContainer = styled.div`
  margin-right: 5px;
  width: 50px;
`;
