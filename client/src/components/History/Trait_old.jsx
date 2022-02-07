import React from 'react';
import styled from 'styled-components';
import { SearchJSONData } from '../SearchJSONData';

function Trait({ data }) {
  let jsonData = SearchJSONData('traits', data.name);
  let style = '';
  for (let i of jsonData.sets) {
    if (i.min <= data.num_units) {
      style = i.style;
    }
  }

  return (
    <TraitsContainer>
      <TraitContent style={{ backgroundImage: `url('../TFTData/traits/${style}.png')` }}>
        <TraitImage src={`../TFTData/traits/${jsonData['name'].toLowerCase()}.svg`}></TraitImage>
        <TooltipText>{data.num_units + jsonData['kr_name']}</TooltipText>
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
