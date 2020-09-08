const config = require('./index');

const db = config.db;
const username = db.username;
const password = db.password;
const database = db.database;
const host = db.host;

module.exports = {
  development: {
    username,
    password,
    database: strong_development,
    host,
    dialect: 'postgres',
  },
  test: {
    username,
    password,
    database: strong_test,
    host,
    dialect: 'postgres',
  },
  production: {
    username,
    password,
    database: strong_production,
    host,
    dialect: 'postgres',
  },
};
