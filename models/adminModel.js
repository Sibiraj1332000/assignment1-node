const makeDb = require('../library/db');

const userListModel = async (orderDirection, valueToOrderBy) => {
    const db = makeDb();
    try {
        const userListQuery = `SELECT id as user_id,first_name,last_name,email,phone FROM user_details order by ${valueToOrderBy} ${orderDirection}`;
        const userListData = await db.query(userListQuery);
        return userListData
    }
    catch (err) {
        console.log(err);
        throw new Error("Internal error");
    }
    finally {
        await db.close();
    }
}

const fetchTakenBooksModel = async (userId) => {
    const db = makeDb();
    try {
        const fetchBookByStatusQuery = `
            SELECT 
                book_details.book_name,
                book_auther.name,
                book_category.category,
                languages.language,
                books_taken.taken_date
            FROM
                books_taken
                    INNER JOIN
                book_details ON books_taken.book_details_id = book_details.id
                    INNER JOIN
                book_category ON book_details.category_id = book_category.id
                    INNER JOIN
                book_auther ON book_details.auther_id = book_auther.id
                INNER JOIN languages ON book_details.language_id=languages.id
            WHERE
                books_taken.status = 'taken'
                    AND books_taken.user_details_id = ?`;
        const fetchBookByStatusData = db.query(fetchBookByStatusQuery, [userId]);
        return fetchBookByStatusData
    }
    catch (err) {
        console.log(err);
        throw new Error("Internal error");
    }
    finally {
        await db.close();
    }
}

const fetchReturnedBooksModel = async (userId) => {
    const db = makeDb();
    try {
        const fetchBookByStatusQuery = `
            SELECT 
                book_details.book_name,
                book_auther.name,
                book_category.category,
                languages.language,
                books_taken.taken_date,
                books_taken.return_date
            FROM
                books_taken
                    INNER JOIN
                book_details ON books_taken.book_details_id = book_details.id
                    INNER JOIN
                book_category ON book_details.category_id = book_category.id
                    INNER JOIN
                book_auther ON book_details.auther_id = book_auther.id
                INNER JOIN languages ON book_details.language_id=languages.id
            WHERE
                books_taken.status = 'returned'
                    AND books_taken.user_details_id = ? order by return_date desc`;
        const fetchBookByStatusData = db.query(fetchBookByStatusQuery, [userId]);
        return fetchBookByStatusData
    }
    catch (err) {
        console.log(err);
        throw new Error("Internal error");
    }
    finally {
        await db.close();
    }
}

// const demo = async () => {
//     const db = makeDb();
//     try {

//         return true
//     }
//     catch (err) {
//         console.log(err);
//         throw new Error("Internal error");
//     }
//     finally {
//         await db.close();
//     }
// }


module.exports = {
    userListModel,
    fetchTakenBooksModel,
    fetchReturnedBooksModel
}