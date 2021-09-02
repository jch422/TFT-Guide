import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import SelectedList from '../components/Main/SelectedList';
import ChampionList from '../components/Main/ChampionList';
import RecommendList from '../components/Main/RecommendList';
import Trait from '../components/Main/Trait';
import { loadDecks, saveDeck } from '../actions';
import { resetUserInfo } from '../actions';
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
    const {
      data: { data },
    } = await axios.post(`${process.env.REACT_APP_SERVER_URI}/recommend`, {
      champions,
      level: champions.length,
    });

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
    <Container onDragEnter={e => handleDragEnter(e, REMOVE_ZONE)}>
      {!!curTraits.length && <TraitsList>{traitItems}</TraitsList>}
      {!curTraits.length && (
        <Guide minWidth="15rem" height="9rem">
          <GuideIcon>ℹ</GuideIcon>
          <Text>챔피언을 배치하면</Text>
          <Text>시너지가 활성화됩니다</Text>
        </Guide>
      )}
      <Draggables>
        <SaveBtn onClick={handleSaveDeck}>저장</SaveBtn>
        <SelectedList
          slots={slots}
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
          champions={recommendations}
          handleRecommendItemClick={handleRecommendItemClick}
        />
      )}
      {!recommendations.length && (
        <Guide minWidth="12rem" height="10rem">
          <GuideIcon>ℹ</GuideIcon>
          <Text>챔피언을 배치하면</Text>
          <Text>추천목록이</Text>
          <Text>활성화됩니다</Text>
        </Guide>
      )}
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: #36393f;
  & > * {
    margin-top: 5rem;
  }
`;

const TraitsList = styled.div`
  min-width: 15rem;
`;

const Guide = styled.div`
  min-width: ${({ minWidth }) => minWidth};
  height: ${({ height }) => height};
  border: 2px solid #cccccc;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 1rem 0;
  align-items: center;
`;

const GuideIcon = styled.div`
  background-color: #cccccc;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color: #36393f;
`;

const Text = styled.div`
  color: #cccccc;
  font-size: 1.2rem;
`;

const Draggables = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 4rem;
  margin-right: 4rem;
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
`;

export default MainPage;
