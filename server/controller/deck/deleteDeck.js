const { Deck_Champion } = require('../../models');

module.exports = async (req, res) => {
  const { deck_id } = req.query;

  let data = await Deck_Champion.destroy({
    where: {
      deckId: deck_id,
    },
  });
  res.status(200).json({ data, message: 'okay' });
};
