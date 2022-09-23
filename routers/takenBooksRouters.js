const express = require('express');
const router = express.Router();

const authenticateTocken = require('../middleware/authenticataeTokenMiddleware');

const takenBooksControlleer = require('../controllers/takenBooksControllers');

router.get('/', authenticateTocken.authenticateTocken, takenBooksControlleer.fetchTakenBooks);
router.post('/return_book', authenticateTocken.authenticateTocken, takenBooksControlleer.returnBookControler);



module.exports = router;