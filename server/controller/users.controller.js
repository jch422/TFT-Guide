const { User } = require('../models/');
const axios = require('axios');

module.exports = {
  get: async (req, res) => {
    try {
      const { data } = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          Authorization: req.headers.authorization,
        },
      });

      const user = await User.findOne({ where: { email: data.email } });
      data.isRegistered = false;
      if (user) {
        data.riotId = user.riotId;
        data.isRegistered = true;
      }

      res.status(200).json({ data, message: 'ok' });
    } catch (err) {
      res.status(401).json({ data: null, message: 'unauthorized' });
    }
  },
  post: async (req, res) => {
    try {
      const { email, riotId } = req.body;
      const [user, created] = await User.findOrCreate({ where: { email }, defaults: { riotId } });

      res.status(201).json({ data: user, message: 'ok' });
    } catch (err) {
      res.status(500).json({ data: null, message: 'server error' });
    }
  },
};
