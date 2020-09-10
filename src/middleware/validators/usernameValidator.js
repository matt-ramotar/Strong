const { check } = require('express-validator');

exports.usernameValidator = [check('username').exists({ checkFalsy: true }).withMessage('Please provide a username')];
