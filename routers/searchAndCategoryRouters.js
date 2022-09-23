const express = require('express');
const router = express.Router();

const authenticateTocken = require('../middleware/authenticataeTokenMiddleware');

const searchAndCategoryController = require('../controllers/searchAndCategoryControllers');

router.get('/category', authenticateTocken.authenticateTocken,searchAndCategoryController.fetchBookByCategory);

router.get('/search_text', authenticateTocken.authenticateTocken,searchAndCategoryController.fetchBookBySearchText);







module.exports = router;