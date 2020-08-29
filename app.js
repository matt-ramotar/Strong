const express = require('express');
const app = express();
const morgan = require('morgan');

const routes = require('./backend/routes/index.js');

app.set('view engine', 'pug');
app.use(morgan('dev'));
app.use(routes);

module.exports = app;
