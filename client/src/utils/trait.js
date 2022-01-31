import traits from '../JSON/traits.json';
import champions from '../JSON/set5_champions.json';

export const traitMapper = traits.reduce((acc, cur) => {
  acc[cur.key] = cur.kr_name;
  return acc;
}, {});

export const deckToSlots = ({ Champion }) => {
  return Champion.reduce((acc, cur) => {
    const slotData = {};
    slotData.championId = cur.id;
    slotData.traits = champions.find(champ => champ.championId === cur.id).traits;
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
    if (traitDetail.key === target) {
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
