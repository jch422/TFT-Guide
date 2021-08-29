const axios = require('axios');

exports.verifyAccessToken = async (req, res, next) => {
  try {
    const {
      data: { email, verified_email, picture },
    } = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: req.headers.authorization,
      },
    });

    if (verified_email) {
      req.email = email;
      req.picture = picture;
      return next();
    } else {
      throw Error('invalid accessToken');
    }
  } catch (err) {
    res.status(401).json({ data: null, message: 'unauthorized' });
  }
};
