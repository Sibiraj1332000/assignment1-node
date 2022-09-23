const bookListModels = require('../models/bookListModels');



const fetchbBookListCategory = async (req, res) => {
    try {
        const result = await bookListModels.fetchCategoryModel();
        return res.json(result);

    }
    catch (err) {
        return res.status(500).json({ success: false })
    }
}




const fetchBookList = async (req, res) => {

    try {
        const user = req.query['logedInUser'];

        const result = await bookListModels.fetchBookListModel(user);

        return res.json({ success: 'true', result });
    }
    catch (err) {
        return res.status(500).json({ success: false })
    }
}


const takeBook = async (req, res) => {


    try {
        const takenBookData = req.body

        const canTakeBook = await bookListModels.canTakeBook(takenBookData.bookId, takenBookData.userId);
        console.log(canTakeBook);

        if (canTakeBook) {
            const updatedCount = await bookListModels.addBookToTakenBooks(takenBookData.bookId, takenBookData.userId);
            console.log("Updated Count : ", updatedCount);
            return res.json({ success: 'true', updatedCount });
        }
        return res.json({ success: 'false', });
    }
    catch (err) {
        return res.status(500).json({ success: false })
    }



}



module.exports = {
    fetchbBookListCategory,
    fetchBookList,
    takeBook
};