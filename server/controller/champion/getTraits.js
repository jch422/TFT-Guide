const champions = require('../../static/champions.json');
const items = require('../../static/items.json');
const traits = require('../../static/traits.json');

module.exports = async (req, res) => {
  const { champion } = req.query;
  const data = {};
  const recommand = [];
  console.log(champion);
  const championTraits = champion.map(kr_name => {
    const championData = champions.filter(x => x.kr_name === kr_name);
    return championData[0].traits;
  });
  const traitsData = championTraits.flat();
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
        if (traitData[i][j][k].min === data[`${key}`]) {
          recommand.push([traitData[i][1], traitData[i][j][k].style]);
        }
      }
    }
  }
  res.status(200).send({ data: recommand });
};
