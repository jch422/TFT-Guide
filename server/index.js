const express = require('express');
// const path = require('path');
// const dotenv = require('dotenv');
const cors = require('cors');

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: './.env.development' });
}

// dotenv.config({
//   path: path.resolve(
//     process.cwd(),
//     process.env.NODE_ENV == 'production' ? '.env' : '.env.development',
//   ),
// });

const app = express();
const usersRouter = require('./routes/user');
const decksRouter = require('./routes/deck');
const matchesRouter = require('./routes/matches');
// const championRouter = require('./routes/champion');
const { verifyAccessToken } = require('./middelware/access-token');

app.use(express.json());
app.use(
  cors({
    origin: [process.env.CLIENT],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  }),
);
app.get('/', (req, res) => res.send("hello world"));
app.use('/users', verifyAccessToken, usersRouter);
app.use('/decks', decksRouter);
app.use('/matches', matchesRouter);
// app.use('/recommend', championRouter);

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});

module.exports = app;

