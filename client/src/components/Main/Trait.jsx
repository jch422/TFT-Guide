import styled from 'styled-components';

import { getTraitStyleAndMinCount } from '../../utils/trait';

const Trait = ({ trait, count }) => {
  let { name } = trait;
  if (name === 'Yordle-Lord') name = 'Yordlelord';
  const [traitStyle, minCount] = getTraitStyleAndMinCount(trait.sets, count);
  const intervals = trait.sets.map(set => set.min);
  const traitImgSrc = `${process.env.REACT_APP_TRAIT_IMG_SRC}/${name}.svg`;
  const backgroundSrc = `../TFTData/traits/${traitStyle}.png`;

  return (
    <TraitContainer>
      <TraitImgContainer>
        <TraitBackground isNone={traitStyle === 'none'} src={backgroundSrc} />
        <TraitSvgWrapper>
          <img src={traitImgSrc} width="30" height="30" alt={trait.name} />
        </TraitSvgWrapper>
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

const TraitContainer = styled.div`
  width: 15rem;
  height: 77px;
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

  @media (max-width: 1200px) {
    &:not(:first-of-type) {
      margin-top: 0;
    }
    min-width: 15rem;
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
