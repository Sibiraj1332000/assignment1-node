const express = require('express');
const router = express.Router();

const adminAuthController = require('../controllers/adminAuthController')

router.post('/login',adminAuthController.adminLoginController)

module.exports = router