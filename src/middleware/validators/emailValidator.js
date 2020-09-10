const { check } = require('express-validator');

exports.emailValidator = [check('email').exists({ checkFalsy: true }).isEmail().withMessage('Please provide a valid email address.')];
