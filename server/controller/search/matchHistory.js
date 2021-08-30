const { default: axios } = require('axios');
const api = 'RGAPI-7f1b7844-47de-4534-9fd7-b226fb2c2301';
module.exports = async (req, res) => {
  const { summoner_name } = req.query;
  const puuid = await axios
    .get(
      `https://kr.api.riotgames.com/tft/summoner/v1/summoners/by-name/${summoner_name}?api_key=${api}`,
    )
    .then(res => res.data.puuid);
  const gameData = await axios
    .get(
      `
    https://asia.api.riotgames.com/tft/match/v1/matches/by-puuid/${puuid}/ids?count=10&api_key=${api}`,
    )
    .then(res => res.data);

  function getMatchHistroy(gameData) {
    return Promise.all(
      gameData.map((x, idx) => {
        return axios.get(`https://asia.api.riotgames.com/tft/match/v1/matches/${x}?api_key=${api}`);
      }),
    ).then(res => {
      const gameDataArray = [];
      for (let i = 0; i < res.length; i++) {
        gameDataArray.push(res[i].data);
      }
      return gameDataArray;
    });
  }

  const matchHistory = await getMatchHistroy(gameData);

  await res.status(200).json({ data: matchHistory });
};
