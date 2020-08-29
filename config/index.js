module.exports = {
  environment: process.env.NODE_ENV || 'development',
  port: process.env.PORT,
  db: require('./database'),
  sel: require('./selectors'),
};
