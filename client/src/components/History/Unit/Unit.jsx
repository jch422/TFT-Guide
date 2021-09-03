import React from 'react';
import styled from 'styled-components';
import Star from './Star';
import Item from './Item';
import { SearchJSONData } from '../../SearchJSONData';

function Unit({ data }) {
  let jsonData = SearchJSONData('champions', data.character_id);
  return (
    <UnitContainer className="unit">
      <StarCotainer>
        <Star tier={data.tier} rarity={data.rarity} />
      </StarCotainer>
      <ImgContainer className="champion">
        <ChampionImg src={`../TFTData/champions/${data.character_id}.png`}></ChampionImg>
        <TooltipText>{jsonData['kr_name']}</TooltipText>
      </ImgContainer>
      <ItemContainer>
        {data.items.map((data, index) => (
          <Item key={index} id={data} />
        ))}
      </ItemContainer>
    </UnitContainer>
  );
}

export default Unit;

const UnitContainer = styled.div`
  margin-right: 5px;
`;

const TooltipText = styled.span`
  visibility: hidden;
  width: auto;
  height: 70%;
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

const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
const StarCotainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-right: 3px;
`;
const ChampionImg = styled.img`
  height: 40px;
`;
