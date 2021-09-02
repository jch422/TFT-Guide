import styled from 'styled-components';
import svgToComponent from '../../utils/svgs';

const Trait = ({ trait, count }) => {
  const { name } = trait;
  const props = { width: 30, height: 30 };
  const [traitStyle, minCount] = getTraitStyleAndMinCount(trait.sets, count);
  const intervals = trait.sets.map(set => set.min);
  const traitSrc =
    traitStyle === 'none'
      ? `../TFTData/traits/${name.toLowerCase()}.png`
      : `../TFTData/traits/${traitStyle}.png`;

  return (
    <TraitContainer>
      <TraitImgContainer>
        <TraitBackground isNone={traitStyle === 'none'} src={traitSrc} />
        {traitStyle !== 'none' && (
          <TraitSvgWrapper>
            {svgToComponent({ svgName: name.toLowerCase(), props })}
          </TraitSvgWrapper>
        )}
      </TraitImgContainer>
      {traitStyle !== 'none' && <TraitCount>{count}</TraitCount>}
      <TraitDetail>
        <TraitName>{trait.kr_name}</TraitName>
        {traitStyle !== 'none' && (
          <TraitIntervals>
            {intervals.map((min, idx) => (
              <TraitMin key={idx} active={min === minCount}>
                {min}
              </TraitMin>
            ))}
          </TraitIntervals>
        )}
        {traitStyle === 'none' && (
          <TraitMin>
            {count} / {minCount}
          </TraitMin>
        )}
      </TraitDetail>
    </TraitContainer>
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

const TraitContainer = styled.div`
  width: 15rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  background-color: #6a6a6a;
  &:not(:first-of-type) {
    margin-top: 0.8rem;
  }

  & > * {
    margin-left: 0.5rem;
  }
`;

const TraitImgContainer = styled.div`
  position: relative;
  width: fit-content;
`;

const TraitBackground = styled.img`
  ${({ isNone }) =>
    isNone &&
    `
    width: 50px;
    height: 58px;
  `}
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

const TraitCount = styled.div`
  background-color: #a1a1a1;
  padding: 1rem 0.7rem;
  color: white;
  border-radius: 5px;
`;

const TraitDetail = styled.div``;

const TraitName = styled.div`
  color: white;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const TraitIntervals = styled.div``;

const TraitMin = styled.span`
  color: ${({ active }) => (active ? 'white' : '#a1a1a1')};
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  &:not(:last-of-type):after {
    content: '➪';
    color: #a1a1a1;
    margin: 0 0.2rem;
  }
`;
