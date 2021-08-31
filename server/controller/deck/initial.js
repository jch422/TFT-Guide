const { champion } = require('../../models');
const champions = require('../../static/champions.json');

module.exports = async (req, res) => {
  let data = champions.map(async x => {
    await champion.create({
      id: x.championId,
      name: x.kr_name,
    });
  });
  res.status(200).json({ data });
};
