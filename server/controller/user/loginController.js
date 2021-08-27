const { default: axios } = require("axios");

const { users } = "../../models/index";
module.exports = async (req, res) => {
  let accessToken = req.headers.authorization;
  // 구글 로그인을 해서 받은 token 애소 email을 찾는다

  let data = await axios.get(
    `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`
  );
  // axios 쓰는 것이 좋은 것 같다
  let email = data.email;
  let riotId = await users.findOne({
    attributes: [riot_id],
    where: { email: email },
  });
  if (riotId === undefined) {
    res.cookie(token);
    res.status(401).json({ code: 401, message: "인증" });
  } else {
    res.cookie(token);
    res
      .status(200)
      .json({ code: 200, message: "인증 성공", email: email, riotId: riotId });
    // send 가 좀 더 포괄적 json은 json 파일을 전달
  }
};
