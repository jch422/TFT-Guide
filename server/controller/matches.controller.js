const axios = require('axios');

module.exports = {
  get: async (req, res) => {
    try {
      const {
        data: { puuid },
      } = await axios.get(
        `${process.env.SUMMONER_SEARCH_URI}/${encodeURIComponent(req.params.riotId)}`,
        {
          params: {
            api_key: process.env.RIOT_API_KEY,
          },
        },
      );

      const { data: matchIds } = await axios.get(
        `${process.env.MATCH_ID_SEARCH_URI}/${puuid}/ids`,
        {
          params: {
            count: 10,
            api_key: process.env.RIOT_API_KEY,
          },
        },
      );

      const result = await Promise.all(
        matchIds.map(matchId =>
          axios.get(`${process.env.MATCH_DATA_SEARCH_URI}/${matchId}`, {
            params: {
              api_key: process.env.RIOT_API_KEY,
            },
          }),
        ),
      );

      const matchesData = result.reduce((acc, matchData) => {
        acc.push(matchData.data);
        return acc;
      }, []);

      res.status(200).json({ data: matchesData, message: 'ok' });
    } catch (err) {
      res.status(400).json({ data: null, message: 'invalid request' });
    }
  },
};
