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

module.exports = {
    userListController,
    fetchReturnedBooksController,
    fetchTakenBooksController
}