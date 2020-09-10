const jwt = require('jsonwebtoken');
const { secret, expiresIn } = require('../../config').jwtConfig;

const db = require('../../db/models');

const { User } = db;

exports.getUserFromToken = async token => {
  try {
    const payload = jwt.verify(token, secret);
    return await User.findByPk(payload.id);
  } catch (err) {
    return null;
  }
};
