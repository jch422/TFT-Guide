const { decks, Deck_Champion } = require('../../models');

module.exports = async (req, res) => {
  const { deck_id, champions } = req.body;
  let data = await decks.findOne({
    where: { id: deck_id },
  });

  await Deck_Champion.destroy({
    where: {
      deckId: deck_id,
    },
  });

  const result = await Promise.all(
    champions.map(({ championId }) => {
      return Deck_Champion.create({
        deckId: data.id,
        championId,
      });
    }),
  );
  res.status(200).json({ data: result, message: 'okay' });
};
