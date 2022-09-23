const express = require('express');
const router = express.Router();
const bookListController = require('../controllers/bookListControllers');

const authenticateTocken = require('../middleware/authenticataeTokenMiddleware');


router.get('/book_category', authenticateTocken.authenticateTocken, bookListController.fetchbBookListCategory);
router.get('/', authenticateTocken.authenticateTocken,bookListController.fetchBookList);
router.post('/take_book',authenticateTocken.authenticateTocken,bookListController.takeBook);


module.exports = router;