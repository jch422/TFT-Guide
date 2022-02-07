import styled from 'styled-components';

import { getTraitStyleAndMinCount } from '../../utils/trait';

const Trait = ({ trait, count }) => {
  let { name } = trait;
  if (name === 'Yordle-Lord') name = 'Yordlelord';

  const [traitStyle] = getTraitStyleAndMinCount(trait.sets, count);
  const traitImgSrc = `${process.env.REACT_APP_TRAIT_IMG_SRC}/${name}.svg`;
  const backgroundSrc = `../TFTData/traits/${traitStyle}.png`;

  return (
    <>
      {traitStyle !== 'none' ? (
        <TraitImgContainer>
          <TraitBackground src={backgroundSrc} />
          <TraitSvgWrapper>
            <img src={traitImgSrc} width="22" height="22" alt={trait.name} />
          </TraitSvgWrapper>
        </TraitImgContainer>
      ) : null}
    </>
  );
};

export default Trait;

const TraitImgContainer = styled.div`
  position: relative;
`;

const TraitBackground = styled.img`
  width: 40px;
`;

const TraitSvgWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
