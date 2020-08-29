const express = require('express');
const router = express.Router();
const csrf = require('csurf');

const models = require('../db/models');

router.get('/', (req, res) => {
  res.render('home', { title: 'Mighty' });
});

module.exports = router;
