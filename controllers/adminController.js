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

const editBookControler = async (req, res) => {

    if (req.file) {
        // return res.status(400).json("Image Not found");
        const imageName = req.file.filename;
        console.log("kjjjkjkjkkj", imageName);
        const fileLocation = 'http://127.0.0.1:8080/' + imageName
        req.body.fileLocation=fileLocation
    }
    console.log("THE FILE : ", req.body);



    try {
        // console.log("REQ BODY ",req.body.bookname);
        reqdata = req.body
        // console.log(req.body);
        // console.log("ENTERED fetchBookListController", req.query.bookId);
        await adminModel.editBookModel(req.body)
        return res.json({ success: true });
    }
    catch (err) {
        return res.status(500).json({ success: false });
    }
}

const fetchBookListController = async (req, res) => {
    try {
        console.log("ENTERED fetchBookListController");
        const result = await adminModel.fetchBook()
        return res.json({ success: true, result });
    }
    catch (err) {
        return res.status(500).json({ success: false });
    }
}

const fetchOneBookControler = async (req, res) => {
    try {
        console.log("ENTERED fetchBookListController", req.query.bookId);
        const result = await adminModel.fetchOneBook(req.query.bookId)
        return res.json({ success: true, result });
    }
    catch (err) {
        return res.status(500).json({ success: false });
    }
}


const deleteBookControler = async (req, res) => {
    try {
        console.log(req.query.bookId);
        adminModel.deleteBookModel(req.query.bookId)
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
    addBookController,
    fetchBookListController,
    fetchOneBookControler,
    editBookControler,
    deleteBookControler
}