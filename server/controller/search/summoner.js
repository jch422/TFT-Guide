module.exports = async (req, res) => {
  const { summoner_name } = req.params;
  const data = axios
    .get(
      `https://kr.api.riotgames.com/tft/summoner/v1/summoners/
    by-name/${summoner_name}
    ?api_key=${api}`
    )
    .then((res) => res.body);
  res.status(200).send({ data: data });
};
