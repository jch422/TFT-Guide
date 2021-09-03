import React from 'react';
import styled from 'styled-components';
import { SearchJSONData } from '../SearchJSONData';

function Trait({ data }) {
  let dataStr = data.split('+');
  let name = dataStr[0];
  const jsonData = SearchJSONData('traits', name);
  let color = dataStr[1];
  let kr_name = dataStr[2];

  return (
    <TraitsContainer>
      <TraitContent style={{ backgroundImage: `url('../TFTData/traits/${color}.png')` }}>
        <TraitImage src={`../TFTData/traits/${jsonData['name'].toLowerCase()}.svg`}></TraitImage>
        <TooltipText>{kr_name}</TooltipText>
      </TraitContent>
    </TraitsContainer>
  );
}

export default Trait;

const TraitsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
const TraitImage = styled.img`
  display: block;
  margin-top: 5px;
  margin-right: 1px;
  height: 20px;
  width: 20px;
  padding: 2px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TooltipText = styled.span`
  visibility: hidden;
  width: auto;
  height: 100%;
  white-space: nowrap;
  background-color: black;
  color: white;
  text-align: center;
  border-radius: 5px;
  padding: 10px 5px;
  position: absolute;
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
const TraitContent = styled.div`
  box-sizing: border-box;
  height: 30px;
  width: 30px;
  background-position: center;
  background-size: 90%;
  background-repeat: no-repeat;
  position: relative;
  display: inline-block;
  display: flex;
  flex-direction: column;
  align-items: center;
  &:hover ${TooltipText} {
    visibility: visible;
  }
`;
