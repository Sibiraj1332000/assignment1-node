const fetchBook = require('../models/searchAndCategoryModels');
const fetchAllBooks = require('../models/bookListModels')

const fetchBookByCategory = async (req, res) => {
    try {
        const userId = req.query.userId;
        const category = req.query.category;

        if (category === 'All') {
            const bookData = await fetchAllBooks.fetchBookListModel(userId);
            return res.json({ success: true, bookData });

        }
        else {
            const bookData = await fetchBook.fetchBookByCategorymodel(userId, category);
            return res.json({ success: true, bookData });
        }

    }
    catch (err) {
        return res.status(500).json({ success: false })
    }

}

const fetchBookBySearchText = async (req, res) => {
    try {
        const userId = req.query.userId;
        const searchText = req.query.searchText;
        const bookData = await fetchBook.fetchBookBySearchTextModel(userId, searchText);
        return res.json({ success: true, bookData });
    }
    catch (err) {
        return res.status(500).json({ success: false })
    }
}



module.exports = {
    fetchBookByCategory, fetchBookBySearchText
}