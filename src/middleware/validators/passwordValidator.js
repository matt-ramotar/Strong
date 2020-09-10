const { check } = require('express-validator');

exports.passwordValidator = [check('password').exists({ checkFalse: true }).withMessage('Please provide a password')];
