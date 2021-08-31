const championData = require('../static/champions.json');
const { Champion } = require('../models');

module.exports = {
  get: async (req, res) => {
    let data = championData.map(
      async x =>
        await Champion.create({
          id: x.championId,
          name: x.kr_name,
        }),
    );
    res.status(200).json({ data });
  },
};
