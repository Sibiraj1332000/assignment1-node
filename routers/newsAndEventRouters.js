const express = require('express');
const router = express.Router();
const newsAndEventsController = require('../controllers/newsAndEventControllers');

const authenticateTocken = require('../middleware/authenticataeTokenMiddleware')




router.get('/', authenticateTocken.authenticateTocken, newsAndEventsController);

module.exports = router;