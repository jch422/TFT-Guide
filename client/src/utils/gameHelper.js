import traitsData from '../JSON/set6.5/traits.json';
import championsData from '../JSON/set6.5/champions.json';

export const getRecommendation = slots => {
  const filteredSlots = slots.filter(removeEmpty);
  if (!filteredSlots.length) return [];

  const level = filteredSlots.length;
  const uniqueSlots = filteredSlots.filter(removeRedundant);
  const [min, max] = levelCostMapper[level];
  let candidates = championsData
    .filter(c => c.cost >= min && c.cost <= max)
    .filter(c => !uniqueSlots.some(({ name }) => name === c.name))
    .filter(c => c.name !== 'Veigar');
  candidates = candidates
    .map(candidate => {
      const newSlots = uniqueSlots.concat(candidate);
      const newTraits = extractTraits(newSlots);
      candidate.score = calcTraitsScore(newTraits);
      return candidate;
    })
    .sort((a, b) => b.score - a.score);

  return candidates.slice(0, 5);
};

const removeEmpty = slot => slot.name;

const removeRedundant = (slot, idx, arr) => arr.findIndex(s => s.name === slot.name) === idx;

const extractTraits = slots => {
  return slots.reduce((acc, { traits }) => {
    traits.forEach(trait => {
      if (acc[trait]) {
        acc[trait]++;
      } else {
        acc[trait] = 1;
      }
    });
    return acc;
  }, {});
};

const calcTraitsScore = traits => {
  const traitsArr = Object.entries(traits);
  return traitsArr.reduce((acc, [trait, cnt]) => {
    const { sets } = traitsData.filter(({ name }) => name === trait)[0];
    for (const { style, min, max } of sets) {
      if (max) {
        if (cnt >= min && cnt <= max) {
          return acc + cnt;
        }
      } else {
        // only min
        if (cnt >= min) {
          return acc + min;
        }
      }
    }
    return acc;
  }, 0);
};

const levelCostMapper = {
  1: [1, 1],
  2: [1, 1],
  3: [1, 2],
  4: [2, 3],
  5: [2, 3],
  6: [3, 4],
  7: [3, 4],
  8: [3, 5],
  9: [4, 5],
  10: [4, 5],
  11: [4, 5],
  12: [4, 5],
};
