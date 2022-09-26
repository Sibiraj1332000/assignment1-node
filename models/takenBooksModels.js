const makeDb = require('../library/db');

const fetchTakenBooksQuery = `
         SELECT 
            book_auther.name AS auther,
            books_taken.book_details_id AS bookId,
            CONVERT( book_details.book_image USING UTF8) AS bookImage,
            book_details.book_name AS bookName,
            books_taken.id AS id,
            books_taken.user_details_id AS userId
        FROM
            books_taken
                INNER JOIN
            book_details ON books_taken.book_details_id = book_details.id
                INNER JOIN
            book_auther ON book_auther.id = book_details.auther_id
        WHERE
            books_taken.user_details_id = ?
            AND books_taken.status = 'taken'
        `;

const fetchTakenBooksModel = async (user) => {

const db = makeDb();
    try {
        
        const fetchTakenBooksData = await db.query(fetchTakenBooksQuery, [user]);

        return fetchTakenBooksData;

    }
    catch (err) {
        console.log("the error", err);
        throw new Error("server Error");
    }
    finally {
        await db.close();
    }
}


const returnBookModel = async (userId, bookId) => {
    console.log("BOOK ID IN returnBookModel : ",bookId);
    const db = makeDb();
    try {

        console.log("ENTERED returnBookModel try");
        const returnBookQuery = `
        UPDATE books_taken SET status = 'returned' 
        WHERE id = ${bookId} AND user_details_id = ${userId}
        `;

        await db.query(returnBookQuery);
        const getBookIdQuery = `SELECT book_details_id from books_taken WHERE id = ?`;
        const getBookIdData = await db.query(getBookIdQuery,[bookId]);
        // console.log("getBookIdData",getBookIdData[0].book_details_id);

        const increaseBookCountQuery = `
            UPDATE book_details SET copies_remaining = (copies_remaining + 1)
                WHERE id = ${getBookIdData[0].book_details_id}
            `;

        await db.query(increaseBookCountQuery);

        const fetchTakenBooksData = await db.query(fetchTakenBooksQuery, [userId]);

        return fetchTakenBooksData;

    }
    catch (err) {
        console.log("the error", err);
        throw new Error("server Error");
    }
    finally {
        await db.close();
    }

}


module.exports = {
    fetchTakenBooksModel,
    returnBookModel
}