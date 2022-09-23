const booksTakenModel = require('../models/takenBooksModels');

const fetchTakenBooks = async (req, res) => {
    try {
        const user = req.query['logedInUser'];

        const result = await booksTakenModel.fetchTakenBooksModel(user)

        return res.json({ success: 'true', result });
    }
    catch (err) {
        return res.status(500).json({ success: false })
    }


}


const returnBookControler = async (req, res) => {
    try {
        const userId = req.body.userId;
        const bookId = req.body.bookId;

        const result = await booksTakenModel.returnBookModel(userId, bookId)

        return res.json({ success: 'true', result });
    }
    catch (err) {
        return res.status(500).json({ success: false })
    }

}


module.exports = { fetchTakenBooks, returnBookControler }