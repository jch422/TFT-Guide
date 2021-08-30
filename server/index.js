const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 8080;
const DEV_CLIENT = process.env.DEV_CLIENT;

const models = require("./models/index.js")

const loginController = require("./controller/user/loginController")
const registerContler = require("./controller/user/registerController")
const infoController = require("./controller/user/infoController")
const matchHistory = require("./controller/search/matchHistory.js")


app.use(express.json());

app.use(
    cors({
      origin: [DEV_CLIENT],
      credentials: true,
      methods: ["GET", "POST","PUT","DELETE","OPTIONS"],
    })
  );

/**
 * 유저 컨트롤러 
 */
app.get('/user/callback' ,loginController )

app.post('/user', registerContler)

// Post 는 생성 하는 것 외에는 
// 

app.get("/user/info", infoController)

app.get("/serach/match", matchHistory)
/**
 * 서버 열기 
 */

 models.sequelize.sync().then(()=>{
  console.log("DB 연결 성공")
}) 

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});


module.exports = app;
