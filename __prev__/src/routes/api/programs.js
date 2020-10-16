const express = require('express');
const router = express.Router();
const csrf = require('csurf');

const { Exercise, Muscle, sequelize, Program } = require('../../../db/models');
const asyncHandler = handler => (req, res, next) => handler(req, res, next).catch(next);

router.get(
  '/programs',
  asyncHandler(async (req, res) => {
    const programs = await Program.findAll();
  })
);
module.exports = router;
