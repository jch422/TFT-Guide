import React from 'react';
import styled from 'styled-components';

const TraitItem = ({ trait, style, size }) => {
  let traitName = trait.replace('Set6_', '');
  if (traitName === 'Rivals') traitName = 'Rival';
  if (traitName === 'Yordle-Lord' || traitName === 'YordleLord') traitName = 'Yordlelord';
  const traitImgSrc = `${process.env.REACT_APP_TRAIT_IMG_SRC}/${traitName}.svg`;
  const styleMapper = {
    1: 'bronze',
    2: 'silver',
    3: 'gold',
    4: 'chromatic',
  };

  return (
    <Wrapper size={size}>
      <TraitBackground size={size} src={`../TFTData/traits/${styleMapper[style]}.png`} />
      <TraitImg size={size} src={traitImgSrc} />
    </Wrapper>
  );
};

export default TraitItem;

const Wrapper = styled.div`
  min-width: ${({ size }) => (size ? size * 0.9 : 36)}px;
  height: ${({ size }) => (size ? size : 40)}px;
  position: relative;
  margin: 0 2px;
`;

const TraitBackground = styled.img`
  width: ${({ size }) => (size ? size * 0.9 : 36)}px;
  height: ${({ size }) => (size ? size : 40)}px;
  position: absolute;
`;

const TraitImg = styled.img`
  width: ${({ size }) => (size ? size / 2 : 20)}px;
  height: ${({ size }) => (size ? size / 2 : 20)}px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
