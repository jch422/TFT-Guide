const path = require('path');
const dotenv = require('dotenv');

dotenv.config({
  path: path.resolve(
    process.cwd(),
    process.env.NODE_ENV === 'production' ? '.env' : '.env.development',
  ),
});

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
    use_env_variable: "JAWSDB_URL",
    dialect: 'mysql',
  },
};
