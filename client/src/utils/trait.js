import traits from '../JSON/set6/traits.json';
//import champions from '../JSON/set5_champions.json';
import champions from '../JSON/set6/champions.json';

export const traitMapper = traits.reduce((acc, cur) => {
  acc[cur.key] = cur.kr_name;
  return acc;
}, {});

export const deckToSlots = ({ Champion }) => {
  return Champion.reduce((acc, cur) => {
    const slotData = {};
    slotData.championId = cur.id;
    slotData.traits = champions.find(
      champ => champ.championId.toLowerCase() === cur.id.toLowerCase(),
    ).traits;
    acc.push(slotData);
    return acc;
  }, []);
};

export const countByTrait = slots => {
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

export const getTraitDetails = target => {
  for (const traitDetail of traits) {
    if (traitDetail.name === target) {
      return traitDetail;
    }
  }
};

const getStyleOrder = (traitDetail, cnt) => {
  let styleOrder = 0;
  for (const set of traitDetail.sets) {
    const { style, min } = set;
    if (cnt >= min) {
      switch (style) {
        case 'bronze':
          styleOrder = 1;
          break;
        case 'silver':
          styleOrder = 2;
          break;
        case 'gold':
          styleOrder = 3;
          break;
        case 'chromatic':
          styleOrder = 4;
          break;
        default:
          styleOrder = 0;
      }
    } else {
      break;
    }
  }
  return styleOrder;
};

export const traitCntSortOption = (a, b) => {
  const [aTrait, aCount] = a;
  const [bTrait, bCount] = b;
  const aTraitDetail = getTraitDetails(aTrait);
  const bTraitDetail = getTraitDetails(bTrait);

  let aOrder = getStyleOrder(aTraitDetail, aCount);
  let bOrder = getStyleOrder(bTraitDetail, bCount);

  return bOrder - aOrder;
};

export const getTraitsFromChampions = championsData => {
  const champIds = championsData.map(champion => champion.character_id);
  const filteredChampIds = champIds.filter((name, idx) => champIds.indexOf(name) === idx);
  const slots = filteredChampIds.map(cId => champions.filter(c => c.championId === cId)?.[0]);
  const traitsObj = countByTrait(slots);
  return Object.entries(traitsObj);
};

export const getTraitStyleAndMinCount = (sets, count) => {
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
