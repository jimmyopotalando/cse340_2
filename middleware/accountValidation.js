const { body, validationResult } = require('express-validator');
const accountModel = require('../models/accountModel');

const validateAccountUpdate = [
  body('firstname')
    .trim()
    .isLength({ min: 2 })
    .withMessage('First name must be at least 2 characters.')
    .escape(),
  body('lastname')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Last name must be at least 2 characters.')
    .escape(),
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please enter a valid email.')
    .normalizeEmail()
    .custom(async (email, { req }) => {
      // Check if email already exists (excluding current user)
      const account = await accountModel.getAccountByEmail(email);
      if (account && account.account_id != req.body.account_id) {
        throw new Error('Email already in use by another account.');
      }
      return true;
    }),
  // check validation result and forward errors if any
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Pass errors to next middleware/controller
      req.validationErrors = errors.array();
      return next();
    }
    next();
  }
];

const validatePasswordChange = [
  body('new_password')
    .optional({ checkFalsy: true }) // password can be empty (means no change)
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters.')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter.')
    .matches(/\d/)
    .withMessage('Password must contain at least one number.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.validationErrors = errors.array();
      return next();
    }
    next();
  }
];

module.exports = {
  validateAccountUpdate,
  validatePasswordChange,
};
