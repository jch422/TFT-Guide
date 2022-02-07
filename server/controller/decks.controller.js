const { Deck, Champion, Deck_Champion } = require('../models');

module.exports = {
  get: async (req, res) => {
    try {
      const decks = await Deck.findAll({
        where: {
          userId: req.params.id,
        },
        include: {
          model: Champion,
          as: 'Champion',
          through: {
            attributes: ['deckId', 'championId'],
          },
        },
      });
      res.status(200).json({ data: decks, message: 'ok' });
    } catch (err) {
      res.status(401).json({ data: null, message: 'invalid userId' });
    }
  },
  post: async (req, res) => {
    try {
      const { id, champions } = req.body;
      const newDeck = await Deck.create({ userId: id });

      const result = await Promise.all(
        champions.map(({ championId }) => {
          return Deck_Champion.create({
            deckId: newDeck.id,
            championId,
          });
        }),
      );

      res.status(201).json({ data: result, message: 'ok' });
    } catch (err) {
      res.status(400).json({ data: null, message: 'invalid request', err });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;

      let data = await Deck_Champion.destroy({
        where: {
          deckId: id,
        },
      });
      await Deck.destroy({
        where: {
          id,
        },
      });
      res.status(200).json({ data, message: 'ok' });
    } catch (err) {
      res.status(400).json({ data: null, message: 'invalid request' });
    }
  },
  put: async (req, res) => {
    try {
      const { id, champions } = req.body;
      const data = await Deck.findOne({
        where: { id: id },
      });

      await Deck_Champion.destroy({
        where: {
          deckId: id,
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
      res.status(200).json({ data: result, message: 'ok' });
    } catch (err) {
      res.status(400).json({ data: null, message: 'invalid request' });
    }
  },
};
