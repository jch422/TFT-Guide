const axios = require('axios');

module.exports = {
  get: async (req, res) => {
    const offset = Number(req.params.offset);
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

      let { data: matchIds } = await axios.get(`${process.env.MATCH_ID_SEARCH_URI}/${puuid}/ids`, {
        params: {
          count: 100,
          api_key: process.env.RIOT_API_KEY,
        },
      });
      matchIds = matchIds.slice(offset * 10, (offset + 1) * 10);

      const result = await Promise.all(
        matchIds.map(matchId =>
          axios.get(`${process.env.MATCH_DATA_SEARCH_URI}/${matchId}`, {
            params: {
              api_key: process.env.RIOT_API_KEY,
            },
          }),
        ),
      );

      let matchesData = result.reduce((acc, matchData) => {
        acc.push(matchData.data);
        return acc;
      }, []);

      res.status(200).json({ data: { matchesData, puuid }, message: 'ok' });
    } catch (err) {
      const {
        response: { status, statusText },
      } = err;
      res.status(status).json({ data: null, message: statusText });
    }
  },
  getPlayerInfo: async (req, res) => {
    const { puuid } = req.params;
    try {
      const { data } = await axios.get(`${process.env.SUMMONER_SEARCH_BY_PUUID_URI}/${puuid}`, {
        params: {
          api_key: process.env.RIOT_API_KEY,
        },
      });
      res.status(200).json({ data });
    } catch (err) {
      const {
        response: { status, statusText },
      } = err;
      res.status(status).json({ data: null, message: statusText });
    }
  },
};
