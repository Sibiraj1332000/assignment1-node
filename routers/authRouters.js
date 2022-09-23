const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

const authControllers = require('../controllers/authControllers');

router.post(
    '/login-user',

    body('userName').isEmail(),
    body('userPwd').exists().isLength({ min: 4 }),

    authControllers.userLogin
);

router.post(
    '/register-user',

    body('firstName').exists(),
    body('lastName').exists(),
    body('email').exists().isEmail(),
    body('phone').exists().isLength({ min: 10 }),
    body('houseName').exists(),
    body('city').exists(),
    body('district').exists(),
    body('post').exists(),
    body('pin').exists().isLength({ min: 6 }),
    body('password').exists(),

    authControllers.userSignup
);

module.exports = router;