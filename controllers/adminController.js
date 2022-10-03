const multer = require('multer');
const adminModel = require('../models/adminModel')


const userListController = async (req, res) => {
    try {
        const { orderDirection, valueToOrderBy } = req.query;
        const result = await adminModel.userListModel(orderDirection, valueToOrderBy)

        return res.json({ success: true, result });
    }
    catch (err) {
        return res.status(500).json({ success: false });
    }
}

const fetchTakenBooksController = async (req, res) => {
    try {

        const userId = req.query.userId;
        const result = await adminModel.fetchTakenBooksModel(userId);
        return res.json({ success: true, result });
    }
    catch (err) {
        return res.status(500).json({ success: false });
    }
}

const fetchReturnedBooksController = async (req, res) => {
    try {

        const userId = req.query.userId;
        const result = await adminModel.fetchReturnedBooksModel(userId);
        return res.json({ success: true, result });
    }
    catch (err) {
        return res.status(500).json({ success: false });
    }
}

const addBookController = async (req, res) => {
    // console.log("ggggg", err);
    // if (err instanceof multer.MulterError) {
    //     // A Multer error occurred when uploading.
    //     // res.send(err)
    //     console.log(err);
    // } 
    // else if (err) {
    //     // An unknown error occurred when uploading.
    //     // res.send(err)
    // }
    if (!req.file) {
        return res.status(400).json("Image Not found");
    }
    const imageName = req.file.filename;
    console.log("kjjjkjkjkkj", imageName);
    const { bookName, auther, category, copiesRemaining, price, language } = req.body;
    console.log("QQQQQQQQQQQQQQQQQ :", bookName, auther, category, copiesRemaining, price, language);

    // console.log("hlhlhl",req.file);
    // if (!req.file) {
    //     console.log("NO FILE");
    // }

    const fileLocation = 'http://127.0.0.1:8080/' + imageName
    // console.log('kkkkkkkk', fileLocation);

    const bookInfo = { bookName, auther, category, copiesRemaining, price, language, imageName: fileLocation };
    console.log("bkinfo : ", bookInfo);
    if (!bookName || !auther || !category || !copiesRemaining || !price || !language) {
        return res.status(400).json("Please fill all fields");
    }

    // console.log(bookInfo);
    try {

        await adminModel.addBookModel(bookInfo)
        return res.json({ success: true });
    }
    catch (err) {
        return res.status(500).json({ success: false });
    }


}

module.exports = {
    userListController,
    fetchReturnedBooksController,
    fetchTakenBooksController,
    addBookController
}