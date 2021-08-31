require('dotenv').config();
const env = process.env;

module.exports = {
  development: {
    username: env.DATABASE_USERNAME,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME,
    host: env.DATABASE_HOST,
    dialect: 'mysql',
  },
  test: {
    username: null,
    password: null,
    database: null,
    host: null,
    dialect: null,
  },
  production: {
    username: env.DATABASE_USERNAME,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME,
    host: env.DATABASE_HOST,
    dialect: 'mysql',
  },
};
