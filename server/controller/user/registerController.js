const { users } = "../../models/index";
module.exports = async (req, res) => {
  let { accessToken } = req.cookie;
  let { riot_id } = req.body;
  let data = await axios.get(
    `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`
  );
  let email = data.email;
  if (!email) {
    res.status(400).send({ code: 400, message: "인증" });
  }
  await users.create({
    email: email,
    riot_id: riot_id,
  });
  res.status(200).send({ code: 200, message: "최초 성공" });
};
