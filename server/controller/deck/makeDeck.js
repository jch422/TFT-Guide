const { decks, Deck_Champion } = require('../../models');

module.exports = async (req, res) => {
  const { id, champions } = req.body;
  const newDeck = await decks.create({
    userId: id,
  });
  console.log(newDeck);
  const result = await Promise.all(
    champions.map(({ championId }) => {
      return Deck_Champion.create({
        deckId: newDeck.id,
        championId,
      });
    }),
  );
  res.status(201).json({ data: result, message: 'ok' });
};
