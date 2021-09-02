import React from 'react';
import styled from 'styled-components';
import { SearchJSONData } from '../../SearchJSONData';

function Item({ id }) {
  let jsonData = SearchJSONData('items', id);

  function pngRead(id) {
    if (id < 10) {
      return '../TFTData/items/0' + id + '.png';
    } else {
      return '../TFTData/items/' + id + '.png';
    }
  }

  return (
    <ItemContainer className="items">
      <Img src={pngRead(id)}></Img>
      <TooltipText>{jsonData['kr_name']}</TooltipText>
    </ItemContainer>
  );
}

export default Item;

const Img = styled.img`
  height: 13px;
`;

const TooltipText = styled.span`
  visibility: hidden;
  width: auto;
  height: 30px;
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
const ItemContainer = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: relative;
  display: inline-block;
  display: flex;
  flex-direction: column;
  align-items: center;
  &:hover ${TooltipText} {
    visibility: visible;
  }
`;
