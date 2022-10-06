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

const addBookModel = async (bookInfo) => {
    const db = makeDb();
    try {
        // console.table(bookInfo);

        const checkAutherExistsQuery = 'SELECT id from book_auther where name = ?';
        const autherId = await db.query(checkAutherExistsQuery, [bookInfo.auther]);

        const insertBookQuery = `INSERT INTO book_details 
                    (book_name,auther_id,book_image,category_id,copies_remaining,price,language_id)
                 VALUES
                    (?,?,?,?,?,?,?)`;

        if (autherId.length != 0) {
            // console.log(autherId[0].id);
            await db.query(insertBookQuery, [
                bookInfo.bookName,
                autherId[0].id,
                bookInfo.imageName,
                bookInfo.category,
                bookInfo.copiesRemaining,
                bookInfo.price,
                bookInfo.language
            ]);

        }
        else {
            console.log("no");
            const insertAutherQuery = 'INSERT INTO book_auther (name) values(?)'
            const result = await db.query(insertAutherQuery, [bookInfo.auther]);
            // console.log(result.insertId);
            await db.query(insertBookQuery, [
                bookInfo.bookName,
                result.insertId,
                bookInfo.imageName,
                bookInfo.category,
                bookInfo.copiesRemaining,
                bookInfo.price,
                bookInfo.language
            ]);
        }

        return true
    }
    catch (err) {
        console.log(err);
        throw new Error("Internal error");
    }
    finally {
        await db.close();
    }
}

const fetchBook = async () => {
    const db = makeDb();
    try {
        const bookListQuery = `
            SELECT 
                book_details.id AS book_id,
                book_details.book_name AS book_name,
                book_auther.name AS auther,
                languages.language AS language,
                book_category.category AS category
            FROM
                book_details
                    JOIN
                book_auther ON book_details.auther_id = book_auther.id
                    JOIN
                book_category ON book_category.id = book_details.category_id
                    JOIN
                languages ON languages.id = book_details.language_id
            where is_deleted=0
                `;
        const bookListData = await db.query(bookListQuery);
        // console.log(bookListData);
        return bookListData
    }
    catch (err) {
        console.log(err);
        throw new Error("Internal error");
    }
    finally {
        await db.close();
    }
}
const fetchOneBook = async (bookId) => {
    const db = makeDb();
    try {
        const bookQuery = `
            SELECT 
                book_details.book_name AS book_name,
                book_auther.name AS auther,
                book_details.category_id AS category,
                book_details.language_id AS language,
                book_details.copies_remaining AS copies,
                book_details.price AS price
            FROM
                book_details
                    JOIN
                book_auther ON book_auther.id = book_details.auther_id
            WHERE
                book_details.id = ?
                `;
        const bookListData = await db.query(bookQuery, [bookId]);
        return bookListData
    }
    catch (err) {
        console.log(err);
        throw new Error("Internal error");
    }
    finally {
        await db.close();
    }
}

const editBookModel = async (bookData) => {
    const db = makeDb();
    try {
        const { language, price, copiesRemaining, category, auther, bookName, bookId, fileLocation } = bookData
        console.log("HHHH_ ", language, price, copiesRemaining, category, auther, bookName, bookId, fileLocation);

        const checkAutherExistsQuery = 'SELECT id from book_auther where name = ?';
        const autherId = await db.query(checkAutherExistsQuery, [auther]);

        const updateBookQuery = fileLocation
            ? `UPDATE book_details 
            SET 
                book_name = ?,auther_id = ?,category_id = ?,copies_remaining = ?,
                price = ?,language_id = ?,book_image = ?
            WHERE
                id = ?`
            : `UPDATE book_details 
            SET 
                book_name = ?,
                auther_id = ?,
                category_id = ?,
                copies_remaining = ?,
                price = ?,
                language_id = ?
            WHERE
                id = ?
            `;

        if (autherId.length != 0) {
            await db.query(updateBookQuery,
                fileLocation
                    ? [bookName, autherId[0].id, category, copiesRemaining, price, language, fileLocation, bookId]
                    : [bookName, autherId[0].id, category, copiesRemaining, price, language, bookId]
            )
        }
        else {
            console.log("no");
            const insertAutherQuery = 'INSERT INTO book_auther (name) values(?)'
            const result = await db.query(insertAutherQuery, [auther]);
            await db.query(updateBookQuery,
                fileLocation
                    ? [bookName, result.insertId, category, copiesRemaining, price, language, fileLocation, bookId]
                    : [bookName, result.insertId, category, copiesRemaining, price, language, bookId]

            );
        }

        return true;

    }
    catch (err) {
        console.log(err);
        throw new Error("Internal error");
    }
    finally {
        await db.close();
    }

}

const deleteBookModel = async (bookId) => {
    const db = makeDb();
    try {
        console.log("bookId", bookId);
        const deleteBookQuery = `UPDATE book_details set is_deleted=1 where id = ?`;
        await db.query(deleteBookQuery, [bookId]);
    }
    catch (err) {
        console.log(err);
        throw new Error("Internal error");
    }
    finally {
        await db.close();
    }
}

module.exports = {
    userListModel,
    fetchTakenBooksModel,
    fetchReturnedBooksModel,
    addBookModel,
    fetchBook,
    fetchOneBook,
    editBookModel,
    deleteBookModel
}