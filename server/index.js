const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config({
  path: path.resolve(
    process.cwd(),
    process.env.NODE_ENV == 'production' ? '.env' : '.env.development',
  ),
});
const app = express();
const usersRouter = require('./routes/user');
const decksRouter = require('./routes/deck');
const matchesRouter = require('./routes/matches');
const championRouter = require('./routes/champion');
const { verifyAccessToken } = require('./middelware/access-token');
const initialController = require('./routes/initial');

app.use(express.json());
app.use(
  cors({
    origin: [process.env.CLIENT],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  }),
);
app.use('/users', verifyAccessToken, usersRouter);
app.use('/deck', decksRouter);
app.use('/matches', matchesRouter);
app.use('/champion', championRouter);
app.use('/initial', initialController);

app.listen(8080, () => {
  console.log(`listening on port ${8080}`);
});

module.exports = app;
