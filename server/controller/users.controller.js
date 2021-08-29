const { User } = require('../models/');

module.exports = {
  get: async (req, res) => {
    try {
      const userInfo = {
        email: req.email,
        picture: req.picture,
        isRegistered: false,
      };
      const user = await User.findOne({ where: { email: req.email } });

      if (user) {
        userInfo.id = user.id;
        userInfo.riotId = user.riotId;
        userInfo.isRegistered = true;
      }

      res.status(200).json({ data: userInfo, message: 'ok' });
    } catch (err) {
      res.status(401).json({ data: null, message: 'unauthorized' });
    }
  },
  post: async (req, res) => {
    try {
      const [user, created] = await User.findOrCreate({
        where: { email: req.email },
        defaults: { riotId: req.body.riotId },
      });

      res.status(201).json({ data: user, message: 'ok' });
    } catch (err) {
      res.status(500).json({ data: null, message: 'server error' });
    }
  },
};
