const champions = require('../static/champions_set5.json');
const traits = require('../static/traits.json');

module.exports = {
  postRecommend: async (req, res) => {
    try {
      const { champions: champion, level } = req.body;
      const data = {};
      const recommend = [];
      const championTraits = champion.map(kr_name => {
        const championData = champions.filter(x => x.kr_name === kr_name);
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
        let data = traits.filter(x => x.key === data_traits);
        traitData.push([data[0].kr_name, data[0].key, data[0].sets]);
      }
      for (let i = 0; i < traitData.length; i++) {
        for (let j = 0; j < traitData[i].length; j++) {
          let key = Object.keys(data)[i];
          for (let k = 0; k < traitData[i][j].length; k++) {
            if (traitData[i][j][k].min === data[`${key}`] + 1) {
              recommend.push([traitData[i][1], traitData[i][j][k].style]);
            }
            if (traitData[i][j][k].min === data[`${key}`] + 2) {
              recommend.push([traitData[i][1], `${traitData[i][j][k].style}_temp`]);
            }
          }
        }
      }
      //정보를 가져오기
      const champion_score = {};
      champions.map(x => {
        let totalScore = 0;
        for (let i = 0; i < recommend.length; i++) {
          if (x.cost <= getCost(level)) {
            if (x.traits.find(x => x === recommend[i][0])) {
              if (!champion.find(name => name === x.kr_name)) {
                let score = getScore(recommend[i][1]);
                if (score >= 4) {
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
      let sortArr = [];
      for (let cost in champion_score) {
        let filterChampion = champions.filter(x => x.kr_name === cost);
        sortArr.push([...filterChampion, champion_score[cost]]);
      }
      sortArr.sort(function (a, b) {
        return b[1] - a[1];
      });
      const lastData = sortArr.slice(1, 6);
      res.status(200).json({ data: lastData, message: 'ok' });
    } catch (err) {
      res.status(400).json({ data: null, message: 'invalid request' });
    }
  },
};
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

function getCost(level) {
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
