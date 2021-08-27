const { default: axios } = require("axios");
const api = "RGAPI-3f915173-8775-43e3-8690-5a2609ab494f";
module.exports = async (req, res) => {
  const { summoner_name } = req.params;
  const puuid = axios
    .get(
      `https://kr.api.riotgames.com/tft/summoner/v1/summoners/
    by-name/${summoner_name}
    ?api_key=${api}`
    )
    .then((res) => res.body.puuid);

  const gameData = await axios.get(`
    https://asia.api.riotgames.com/tft/match/v1/matches/by-puuid/${puuid}/ids?
    count=20&
    api_key=${api}`);

  // primise all
  const matchHistory = gameData.map((x) =>
    axios
      .get(
        `https://asia.api.riotgames.com/tft/match/v1/matches/
        ${x}?api_key=${api}`
      )
      .then(
        (res) => {
          const { game_datatime, game_length } = res.info;
          const info = res.info.participants;
          const myMatch = info.filter((x) => x.puuid == puuid);
          return myMatch, game_datatime, game_length;
        }
        // 챔피언, 시너지, 아이템, 1성 2성
      )
  );
  res.status(200).send({ game_datatime, game_length, data: matchHistory });
};
