const { decks, champion } = require('../../models');

module.exports = async (req, res) => {
  const deck_data = await decks.findAll({
    where: {
      user_id: req.query.id,
    },
    include: {
      model: champion,
      as: 'champion',
    },
  });
  console.log(deck_data);
  res.status(200).json({ data: deck_data, message: 'ok' });
};
