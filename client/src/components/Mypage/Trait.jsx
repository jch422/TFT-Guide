import styled from 'styled-components';
import svgToComponent from '../../utils/svgs';

const Trait = ({ trait, count }) => {
  const { name } = trait;
  const props = { width: 22, height: 22 };
  const [traitStyle, minCount] = getTraitStyleAndMinCount(trait.sets, count);
  const traitSrc =
    traitStyle === 'none'
      ? `../TFTData/traits/${name.toLowerCase()}.png`
      : `../TFTData/traits/${traitStyle}.png`;

  return (
    <>
      {traitStyle !== 'none' ? (
        <TraitImgContainer>
          <TraitBackground src={traitSrc} />
          {traitStyle !== 'none' && (
            <TraitSvgWrapper>
              {svgToComponent({ svgName: name.toLowerCase(), props })}
            </TraitSvgWrapper>
          )}
        </TraitImgContainer>
      ) : null}
    </>
  );
};

export default Trait;

const getTraitStyleAndMinCount = (sets, count) => {
  const firstSet = sets[0];
  const lastSet = sets[sets.length - 1];

  if (count < firstSet.min) {
    return ['none', firstSet.min];
  }
  if (count >= lastSet.min) {
    return [lastSet.style, lastSet.min];
  }
  for (const set of sets) {
    if (count >= set.min && count <= set.max) {
      return [set.style, set.min];
    }
  }
};

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
