const makeDb = require('../library/db');

const fetchCategoryModel = async () => {
const db = makeDb();
    try {
        
        const fetchCategoryQuery = `select * from book_category`;
        const fetchCategoryData = await db.query(fetchCategoryQuery);
        return fetchCategoryData;

    }
    catch (err) {
        console.log("the error", err);
        throw new Error("server Error");

    }
    finally {
        await db.close();
    }
}


const fetchBookListModel = async (user) => {

const db = makeDb();
    try {
        
        fetchBooklistQuery = `
            SELECT 
                book_details.id AS id,
                book_details.copies_remaining AS count,
                book_category.category AS category,
                book_details.book_name AS bookName,
                CONVERT(book_details.book_image USING utf8) AS bookImage,
                book_auther.name AS auther
            FROM
                book_details
            INNER JOIN
                book_auther ON book_details.auther_id = book_auther.id
            INNER JOIN
                book_category ON book_category.id = book_details.category_id
            WHERE
                book_details.id NOT IN (SELECT 
                book_details_id
            FROM
                books_taken
            WHERE
                user_details_id = ${user} AND status = 'taken')
            `;

        const fetchBookListData = await db.query(fetchBooklistQuery);
        console.log("BOOKLIST USERID ", user);
        console.log("BOOKLIST DATA ", fetchBookListData);

        return fetchBookListData;
    }
    catch (err) {
        console.log("the error", err);
        throw new Error("server Error");
    }
    finally {
        await db.close();
    }
}

const addBookToTakenBooks = async (bookId, userId) => {
    const db = makeDb();
    console.log("Book Id :  ", bookId);

    try {

        const decreaseBookCountQuery = `
            UPDATE book_details SET copies_remaining = (copies_remaining - 1)
                WHERE id = ${bookId}
            `;

        await db.query(decreaseBookCountQuery);

        const fetchBookCountQuery = `
            SELECT copies_remaining as count FROM book_details
                WHERE id = ${bookId}
            `;

        const count = await db.query(fetchBookCountQuery);

        const addToTakenBooksQuery = `
        INSERT INTO books_taken(taken_date,book_details_id,user_details_id)
         VALUES(curdate(),?,?);
        `;

        await db.query(addToTakenBooksQuery, [bookId, userId]);



        return count;

    }
    catch (err) {
        console.log("the error", err);
        throw new Error("server Error");
    }
    finally {
        await db.close()
    }

}


const canTakeBook = async (bookId, userId) => {
    const db = makeDb();
    try {
        
        const isBookTakenQuery = `
        SELECT id FROM books_taken
            WHERE book_details_id = ${bookId} AND user_details_id = ${userId} 
            AND status = 'taken'
            `;

        const isBookTakenData = await db.query(isBookTakenQuery);
        // return isBookTakenData

        const fetchBookCountQuery = `
            SELECT copies_remaining as count FROM book_details
                WHERE id = ${bookId}
            `;

        const count = await db.query(fetchBookCountQuery);
        console.log("isBookTakenData.length", isBookTakenData.length, count[0].count);
        if (isBookTakenData.length !== 0 && isBookTakenData.length, count[0].count > 0) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (err) {
        console.log("the error", err);
        throw new Error("server Error");
    }
    finally {
        await db.close()
    }
}


module.exports = {
    fetchCategoryModel,
    fetchBookListModel,
    addBookToTakenBooks,
    canTakeBook
};