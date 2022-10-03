const express = require('express');
const { upload, fileErrorHandling, validateFormData } = require('../middleware/fileUploadMiddleware');

const router = express.Router();


const adminAuthController = require('../controllers/adminAuthController');
const userListController = require('../controllers/adminController');
const authenticateTocken = require('../middleware/authenticataeTokenMiddleware');


router.post('/login', adminAuthController.adminLoginController);
router.get('/user_list', authenticateTocken.authenticateTocken, userListController.userListController);
router.get('/taken_books', authenticateTocken.authenticateTocken, userListController.fetchTakenBooksController);
router.get('/returned_books', authenticateTocken.authenticateTocken, userListController.fetchReturnedBooksController);

router.post(
    '/add_book',
    authenticateTocken.authenticateTocken,
    upload.single('bookImage'),
    fileErrorHandling,
    userListController.addBookController
)

module.exports = router;