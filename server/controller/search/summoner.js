const { default: axios } = require('axios');
const api = 'RGAPI-7f1b7844-47de-4534-9fd7-b226fb2c2301';
module.exports = async (req, res) => {
  const { summoner_name } = req.query;

  const data = await axios
    .get(
      `https://kr.api.riotgames.com/tft/summoner/v1/summoners/by-name/${summoner_name}?api_key=${api}`,
    )
    .then(res => res.data);
  res.status(200).send({ data: data });
};
