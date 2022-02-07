import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import styled from 'styled-components';

import { costColorMapper } from '../../utils/constants';

const ChampionItem = ({ championData, size }) => {
  let champName = championData.character_id.replace('TFT6_', '');
  if (champName === 'ChoGath') champName = 'Chogath';
  const champImgSrc = `${process.env.REACT_APP_CHAMP_IMG_SRC}/${champName}.png`;
  const color = costColorMapper[championData.rarity + 1];

  return (
    <Wrapper>
      <Tier>
        {Array.from({ length: championData.tier }).map((_, idx) => (
          <Star key={idx}>
            <AiFillStar color={color} size="12px" />
          </Star>
        ))}
      </Tier>
      <ImgWrapper size={size} borderColor={color}>
        <ChampionImg src={champImgSrc}></ChampionImg>
      </ImgWrapper>
    </Wrapper>
  );
};

export default ChampionItem;

const Wrapper = styled.div`
  margin: 0 3px;
`;

const Tier = styled.div`
  display: flex;
  justify-content: center;
`;

const Star = styled.div``;

const ImgWrapper = styled.div`
  width: ${({ size }) => (size ? size : '40px')};
  height: ${({ size }) => (size ? size : '40px')};
  border-radius: 5px;
  border: 2px solid ${({ borderColor }) => borderColor};
`;

const ChampionImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 5px;
`;
