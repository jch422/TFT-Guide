const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 8080;
const DEV_CLIENT = process.env.DEV_CLIENT;

app.use(express.json());

app.use(
    cors({
      origin: [DEV_CLIENT],
      credentials: true,
      methods: ["GET", "POST","PUT","DELETE","OPTIONS"],
    })
  );


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

module.exports = app;
