const { default: axios } = require("axios");

const { users } = "../../models/index";

module.exports = async (req, res) => {
  let { accessToken } = req.cookie;
  let data = await axios.get(
    `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`
  );
  let email = data.email;
  if (!email) {
    res.status(400).send({ code: 400, message: "인증" });
  }
  let userInfo = await users.findAll({
    where: {
      email: email,
    },
  });
  if (!userInfo) {
    res.status(404).send({ code: 404, message: "존재하지 않는 유저입니다" });
  }
  let { id, riot_id, created_at, updated_at } = userInfo;
  res.status(200).send(id, email, riot_id, created_at, updated_at);
};
