import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import Trait from '../../components/Mypage/Trait';
import ChampionList from './ChampionList';

import { saveDeck } from '../../actions';
import { deckToSlots, countByTrait, getTraitDetails, traitCntSortOption } from '../../utils/trait';
import { EMPTY_SLOT } from '../../utils/constants';

import championsData from '../../JSON/set6/champions.json';

const Deck = ({ order, deck, deleteDeck, isDark }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const slots = deckToSlots(deck);
  const traitsObj = countByTrait(slots);
  const traits = Object.entries(traitsObj);
  const traitItems = traits.sort(traitCntSortOption).map(([traitName, count]) => {
    const trait = getTraitDetails(traitName);
    return [trait, count];
  });
  const hasSynergy = traitItems.some(([trait, count]) => count >= trait.sets[0].min);
  const champions = deck.Champion.reduce((acc, cur) => {
    const champ = championsData.find(c => c.championId.toLowerCase() === cur.id.toLowerCase());
    acc.push(champ);
    return acc;
  }, []);

  const handleClick = () => {
    const proceed = window.confirm('빌드 페이지로 불러오시겠습니까?');
    if (!proceed) return;
    const champsToSlots = deck.Champion.map(champ => {
      const champData = championsData.find(c => c.championId === champ.id);
      return { ...champData };
    });
    while (champsToSlots.length < 10) {
      champsToSlots.push(EMPTY_SLOT);
    }

    dispatch(saveDeck(champsToSlots));
    history.push('/');
  };

  const handleDelete = e => {
    e.stopPropagation();
    const proceed = window.confirm('덱을 삭제하시겠습니까?');
    if (!proceed) return;
    deleteDeck(deck.id);
  };

  return (
    <Wrapper isDark={isDark} onClick={handleClick}>
      <Order isDark={isDark}>#{order + 1}</Order>
      <IconsAndChampsWrapper>
        <TraitIcons>
          {traitItems.map(([trait, count], idx) => {
            return <Trait key={idx} trait={trait} count={count} />;
          })}
          {!hasSynergy && <NoSynergy isDark={isDark}>시너지 없음</NoSynergy>}
        </TraitIcons>
        <ChampionList champions={champions} />
      </IconsAndChampsWrapper>
      <DeleteBtn isDark={isDark} onClick={handleDelete}>
        &times;
      </DeleteBtn>
    </Wrapper>
  );
};

export default Deck;

const Wrapper = styled.div`
  border: 1px solid ${({ isDark }) => (isDark ? '#535353' : '#d1d1d1')};
  background-color: ${({ isDark }) => (isDark ? '#27282e' : '#dbdbdb')};
  width: 1200px;
  height: 80px;
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  position: relative;
  &:first-of-type {
    margin-top: 3rem;
  }
  &:last-of-type {
    margin-bottom: 3rem;
  }
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.02);
    cursor: pointer;
    background-color: ${({ isDark }) =>
      isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'};
  }
  @media (max-width: 1200px) {
    width: 700px;
    height: 120px;
  }
  @media (max-width: 700px) {
    width: 480px;
  }
`;

const Order = styled.div`
  color: ${({ isDark }) => (isDark ? 'white' : '#292929')};
  width: 30px;
  padding-left: 0.5rem;
`;

const TraitIcons = styled.div`
  display: flex;
  width: 500px;
  height: 56px;
  align-items: center;
  padding-left: 1.5rem;
`;

const NoSynergy = styled.div`
  color: ${({ isDark }) => (isDark ? 'white' : '#292929')};
`;

const IconsAndChampsWrapper = styled.div`
  display: flex;

  @media (max-width: 1200px) {
    flex-direction: column;
  }
`;

const DeleteBtn = styled.div`
  font-size: 40px;
  text-align: center;
  margin-left: auto;
  margin-right: 1rem;
  color: ${({ isDark }) => (isDark ? 'white' : 'black')};
  &:hover {
    color: crimson;
  }
  @media (max-width: 700px) {
    position: absolute;
    top: -3px;
    right: 5px;
    margin-right: 0;
  }
`;
