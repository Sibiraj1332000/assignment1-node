const express = require('express');
const router = express.Router();

const authenticateTocken = require('../middleware/authenticataeTokenMiddleware');

const takenBooksControlleer = require('../controllers/takenBooksControllers');

router.get('/', authenticateTocken.authenticateTocken, takenBooksControlleer.fetchTakenBooks);
router.post('/return_book', authenticateTocken.authenticateTocken, takenBooksControlleer.returnBookControler);
router.get('/takenbooks_count',authenticateTocken.authenticateTocken,takenBooksControlleer.takenBooksCountController);



module.exports = router;