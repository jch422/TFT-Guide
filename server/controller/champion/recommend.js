const champions = require('../../static/champions.json');
const items = require('../../static/items.json');
const traits = require('../../static/traits.json');

module.exports = async (req, res) => {
  const { champion, level } = req.query;
  const data = {};
  const recommand = [];
  console.log(champion);
  const championTraits = champion.map(kr_name => {
    const championData = champions.filter(x => x.kr_name === kr_name);
    console.log(championData[0]);
    return championData[0].traits;
  });
  const traitsData = championTraits.flat();
  traits.map(x => {
    data[x.key] = 0;
  });
  traitsData.map(x => {
    if (!data[x]) {
      data[x] = 1;
    } else {
      data[x] = data[x] + 1;
    }
  });
  const traitData = [];
  for (const data_traits in data) {
    let data = traits.filter(x => x.key == data_traits);
    traitData.push([data[0].kr_name, data[0].key, data[0].sets]);
  }
  for (let i = 0; i < traitData.length; i++) {
    for (let j = 0; j < traitData[i].length; j++) {
      let key = Object.keys(data)[i];
      for (let k = 0; k < traitData[i][j].length; k++) {
        if (traitData[i][j][k].min === data[`${key}`] + 1) {
          recommand.push([traitData[i][1], traitData[i][j][k].style]);
        }
        if (traitData[i][j][k].min === data[`${key}`] + 2) {
          console.log(traitData[i][1], 'temp');
          recommand.push([traitData[i][1], `${traitData[i][j][k].style}_temp`]);
        }
      }
    }
  }
  console.log(recommand);
  //정보를 가져오기
  const champion_score = {};
  champions.map(x => {
    let totalScore = 0;
    for (let i = 0; i < recommand.length; i++) {
      if (x.cost <= getCost(level)) {
        if (x.traits.find(x => x === recommand[i][0])) {
          if (!champion.find(name => name === x.kr_name)) {
            let score = getScore(recommand[i][1]);
            if (score >= 4) {
              console.log(x.kr_name);
            }
            if (
              x.kr_name === '가렌' ||
              x.kr_name === '그웬' ||
              x.kr_name === '하이머딩거' ||
              x.kr_name === '티모'
            ) {
              totalScore = 5;
            } else {
              totalScore += score * parseFloat(`1.${x.cost}`);
            }
          }
        }
      }
    }
    champion_score[`${x.kr_name}`] = totalScore.toFixed(3);
  });
  let sortobj = [];
  for (let cost in champion_score) {
    sortobj.push([cost, champion_score[cost]]);
  }
  sortobj.sort(function (a, b) {
    return b[1] - a[1];
  });
  console.log(sortobj);
  const lastData = sortobj.slice(0, 8);

  res.status(200).send({ data: lastData });

  // 여기서는 고민 해보자
  function getScore(style) {
    if (style === 'bronze_temp') {
      return 0.5;
    }
    if (style === 'bronze') {
      return 2;
    }
    if (style === 'silver_temp') {
      return 1;
    }
    if (style === 'silver') {
      return 4;
    }
    if (style === 'gold_temp') {
      return 2.5;
    }
    if (style === 'gold') {
      return 6;
    }
    if (style === 'chromatic_temp') {
      return 5;
    }
    return 9;
  }

  function getCost(cost) {
    if (level === 1 || level === 2) {
      return 1;
    }
    if (level === 3 || level === 4) {
      return 2;
    }
    if (level === 5) {
      return 3;
    }
    if (level === 6) {
      return 4;
    }
    return 5;
  }
  // bronze = 2점 silver = 3점 gold = 5점 chromatic = 9점
  // 1. 많은
  // 1. 가장 강한 시너지를 가지고 오는 것을 추천
  // 2. 가장 많은 시너지를 가지고 오는 것을 추천
};
