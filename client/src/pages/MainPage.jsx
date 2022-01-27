import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import SelectedList from '../components/Main/SelectedList';
import ChampionList from '../components/Main/ChampionList';
import RecommendList from '../components/Main/RecommendList';
import Spinner from '../components/Spinner';
import { loadDecks, saveDeck, resetUserInfo, setLoader } from '../actions';
import Trait from '../components/Main/Trait';
import champions from '../JSON/set5_champions.json';
import traits from '../JSON/traits.json';

const REMOVE_ZONE = -1;
const emptySlot = {
  name: '',
  kr_name: '',
  championId: '',
  cost: 0,
  traits: [],
};

const filterRedundantChampions = slots => {
  return slots
    .map(slot => slot.kr_name)
    .filter((name, idx, names) => name && idx === names.indexOf(name));
};

const countByTrait = slots => {
  const champSet = new Set();
  return slots.reduce((acc, { championId, traits }) => {
    if (!champSet.has(championId)) {
      champSet.add(championId);
      traits.forEach(trait => {
        if (acc[trait]) {
          ++acc[trait];
        } else {
          acc[trait] = 1;
        }
      });
    }
    return acc;
  }, {});
};

const getTraitDetails = target => {
  for (const traitDetail of traits) {
    if (traitDetail.key === target) {
      return traitDetail;
    }
  }
};

const MainPage = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.userInfoReducer);
  const buildingDeck = useSelector(state => state.deckReducer.deck);
  const { isDark } = useSelector(state => state.themeReducer);
  const { isLoading } = useSelector(state => state.loaderReducer);

  const [slots, setSlots] = useState([...buildingDeck]);
  const [curTraits, setCurTraits] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  const history = useHistory();
  const draggingChamp = useRef();
  const dragOverSlot = useRef();
  const draggingSlot = useRef();

  const getDecks = async () => {
    const {
      data: { data },
    } = await axios.get(`${process.env.REACT_APP_SERVER_URI}/decks/${userInfo.id}`);
    dispatch(loadDecks(data));
  };

  const getRecommendations = async champions => {
    if (!champions.length) {
      setRecommendations([]);
      return;
    }
    dispatch(setLoader(true));
    const {
      data: { data },
    } = await axios.post(`${process.env.REACT_APP_SERVER_URI}/recommend`, {
      champions,
      level: champions.length,
    });
    dispatch(setLoader(false));
    const championsInfo = data.reduce((acc, [championInfo]) => {
      acc.push(championInfo);
      return acc;
    }, []);
    setRecommendations(championsInfo);
  };

  useEffect(() => {
    if (userInfo.id) {
      getDecks();
    }
    const filteredChampions = filterRedundantChampions(buildingDeck);
    if (filteredChampions.length) {
      setSlots(buildingDeck);
    }
  }, []);

  useEffect(() => {
    const traitsObj = countByTrait(slots);
    setCurTraits(Object.entries(traitsObj));
    dispatch(saveDeck(slots));
    const filteredChampions = filterRedundantChampions(slots);
    getRecommendations(filteredChampions);
  }, [slots]);

  const handleDragStart = (e, idx) => (draggingChamp.current = idx);
  const handleSlotDragStart = (e, idx) => (draggingSlot.current = idx);
  const handleDragEnter = (e, idx) => {
    e.stopPropagation();
    dragOverSlot.current = idx;
  };
  const handleDragEnd = e => {
    setSlots(prevSlots => {
      return prevSlots.map((slot, idx) => {
        if (idx !== dragOverSlot.current) {
          return { ...slot };
        }
        return { ...slot, ...champions[draggingChamp.current] };
      });
    });
  };
  const handleSlotDragEnd = e => {
    if (dragOverSlot.current === REMOVE_ZONE) {
      setSlots(prevSlots => {
        return prevSlots.map((slot, idx) => {
          if (idx !== draggingSlot.current) {
            return { ...slot };
          }
          return { ...emptySlot };
        });
      });
    } else {
      setSlots(prevSlots => {
        return prevSlots.map((slot, idx) => {
          if (idx === draggingSlot.current) {
            return { ...prevSlots[dragOverSlot.current] };
          }
          if (idx === dragOverSlot.current) {
            return { ...prevSlots[draggingSlot.current] };
          }
          return { ...slot };
        });
      });
    }
  };
  const handleRecommendItemClick = championToAdd => {
    let slotIdx = -1;
    for (let i = 0; i < slots.length; i++) {
      if (i % 2 === 0 && slots[i].cost === 0) {
        slotIdx = i;
        break;
      }
    }
    if (slotIdx > -1) {
      setSlots(prevSlots => {
        const newSlots = [...prevSlots];
        newSlots[slotIdx] = { ...championToAdd };
        return newSlots;
      });
      return;
    }
    for (let i = 0; i < slots.length; i++) {
      if (i % 2 !== 0 && slots[i].cost === 0) {
        slotIdx = i;
        break;
      }
    }
    if (slotIdx > -1) {
      setSlots(prevSlots => {
        const newSlots = [...prevSlots];
        newSlots[slotIdx] = { ...championToAdd };
        return newSlots;
      });
      return;
    }
    if (slotIdx === -1) {
      alert('덱이 전부 찼습니다! 한 개 이상의 자리를 만들어주세요😉');
    }
  };

  const handleSaveDeck = async () => {
    if (!curTraits.length) {
      alert('한 개 이상의 챔피언을 덱에 올려놓아 주세요!');
      return;
    }
    if (!userInfo?.id) {
      return history.push('/login');
    }
    try {
      const {
        data: { message },
      } = await axios.post(`${process.env.REACT_APP_SERVER_URI}/decks`, {
        id: userInfo.id,
        champions: slots.filter(slot => !!slot.championId),
      });

      if (message === 'ok') {
        getDecks();
        alert('저장 완료');
      }
    } catch (err) {
      console.log(err);
      alert('정상적이지 않은 접근입니다');
      dispatch(resetUserInfo());
      history.push('/login');
    }
  };

  const traitCntSortOption = (a, b) => {
    const [aTrait, aCount] = a;
    const [bTrait, bCount] = b;
    const aTraitDetail = getTraitDetails(aTrait);
    const bTraitDetail = getTraitDetails(bTrait);
    return bCount / bTraitDetail.sets[0].min - aCount / aTraitDetail.sets[0].min;
  };

  const traitItems = curTraits.sort(traitCntSortOption).map(([traitName, count], idx) => {
    const trait = getTraitDetails(traitName);
    return <Trait key={idx} trait={trait} count={count} />;
  });

  return (
    <Container isDark={isDark} onDragEnter={e => handleDragEnter(e, REMOVE_ZONE)}>
      {!!curTraits.length && <TraitsList>{traitItems}</TraitsList>}
      {!curTraits.length && (
        <Guide isDark={isDark} minWidth="15rem" height="9rem">
          <GuideIcon isDark={isDark}>ℹ</GuideIcon>
          <Text isDark={isDark}>챔피언을 배치하면</Text>
          <Text isDark={isDark}>시너지가 활성화됩니다</Text>
        </Guide>
      )}
      <Draggables>
        <SaveBtn onClick={handleSaveDeck}>저장</SaveBtn>
        <SelectedList
          slots={slots}
          isDark={isDark}
          handleDragEnter={handleDragEnter}
          handleSlotDragStart={handleSlotDragStart}
          handleSlotDragEnd={handleSlotDragEnd}
        />
        <ChampionList
          champions={champions}
          handleDragStart={handleDragStart}
          handleDragEnd={handleDragEnd}
        />
      </Draggables>
      {!!recommendations.length && (
        <RecommendList
          isDark={isDark}
          champions={recommendations}
          handleRecommendItemClick={handleRecommendItemClick}
        />
      )}
      {isLoading && (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      )}
      {!recommendations.length && (
        <Guide isDark={isDark} minWidth="16rem" height="10rem">
          <GuideIcon isDark={isDark}>ℹ</GuideIcon>
          <Text isDark={isDark}>챔피언을 배치하면</Text>
          <Text isDark={isDark}>추천목록이</Text>
          <Text isDark={isDark}>활성화됩니다</Text>
        </Guide>
      )}
    </Container>
  );
};

const Container = styled.div`
  min-height: calc(100vh - 60px);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: ${({ isDark }) => (isDark ? '#36393f' : '#FAF8FF')};
  & > div {
    margin-top: 5rem;
  }
  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
  }
  @media (max-width: 1200px) {
    & > div {
      margin-top: 0rem;
    }
    justify-content: space-evenly;
  }
`;

const TraitsList = styled.div`
  min-width: 15rem;
  @media (max-width: 1200px) {
    margin-top: 1rem;
    box-sizing: content-box;
    display: flex;
    flex-direction: row;
    overflow-x: scroll;
    width: 90%;
    & > div {
      margin-right: 0.5rem;
    }
  }
`;

const Guide = styled.div`
  min-width: ${({ minWidth }) => minWidth};
  height: ${({ height }) => height};
  border: 2px solid ${({ isDark }) => (isDark ? '#cccccc' : '#0c2e41')};
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 1rem 0;
  align-items: center;
  @media (max-width: 1200px) {
    margin-top: 1rem;
    min-height: 6rem;
  }
`;

const GuideIcon = styled.div`
  background-color: ${({ isDark }) => (isDark ? '#cccccc' : '#0c2e41')};
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color: ${({ isDark }) => (isDark ? '#ffffff' : '#fbed0b')};
`;

const Text = styled.div`
  color: ${({ isDark }) => (isDark ? '#cccccc' : '#0c2e41')};
  font-size: 1.2rem;
`;

const Draggables = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 4rem;
  margin-right: 4rem;
  @media (max-width: 1200px) {
    margin-top: 1rem;
  }
`;

const SaveBtn = styled.div`
  position: absolute;
  top: -3.5rem;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: salmon;
  width: 70px;
  height: 40px;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  text-shadow: 2px 2px 1px black;
  transition: background-color 200ms linear;
  &:hover {
    cursor: pointer;
    background-color: #68cc66;
    transition: background-color 200ms linear;
  }
  @media (max-width: 1200px) {
    top: 0;
  }
`;

const SpinnerContainer = styled.div`
  position: absolute;
`;

export default MainPage;
