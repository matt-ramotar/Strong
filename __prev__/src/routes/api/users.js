const express = require('express');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const csrfProtection = require('csrf')({ cookie: true });

const { getUserToken, requireAuth } = require('../../auth');
const { asyncHandler, validationErrorHandler } = require('../../middleware').errors;
const { emailValidator, passwordValidator, usernameValidator } = require('../../middleware').validators;
const { expiresIn } = require('../../../config').jwtConfig;

const db = require('../../../db/models');
const { User, Workout } = db;

const router = express.Router();

router.post(
  '/',
  csrfProtection,
  usernameValidator,
  emailValidator,
  passwordValidator,
  validationErrorHandler,
  asyncHandler(async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, hashedPassword });

    const token = await getUserToken(user);

    res.cookie('token', token, { maxAge: expiresIn * 1000 });

    res.json({ id: user.id, token });
  })
);

router.post(
  '/token',
  csrfProtection,
  emailValidator,
  passwordValidator,
  validationErrorHandler,
  asyncHandler(async (req, res, next) => {
    const { username, password } = req.body;
    const user = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email: username }],
      },
    });
    if (!user || !user.validatePassword(password)) {
      const err = new Error('The username and password you entered were incorrect. Please try again.');
      err.status = 401;
      err.title = 'Unauthorized';
      throw err;
    }

    const token = await getUserToken(user);

    res.cookie('token', token, { maxAge: expiresIn * 1000 });

    res.json({ id: user.id, token });
  })
);

router.get(
  '/token',
  asyncHandler(async (req, res, next) => {
    if (req.user) return res.json({ id: req.user.id, username: req.user.username });
    const err = new Error('Invalid token.');
    err.status = 401;
    next(err);
  })
);

module.exports = router;
