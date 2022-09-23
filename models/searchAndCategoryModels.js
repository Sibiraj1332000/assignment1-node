const makeDb = require("../library/db");

const fetchBookByCategorymodel = async (userId, bookCategory) => {
    const db = makeDb();
    try {
        const fetchBookByCategoryQuery = `
            SELECT 
                book_details.id AS id,
                book_details.copies_remaining AS count,
                book_category.category AS category,
                book_details.book_name AS bookName,
                CONVERT( book_details.book_image USING UTF8) AS bookImage,
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
                        user_details_id = ? AND status = 'taken')
                    AND book_category.category = ?
        `;

        const fetchBookByCategoryData = await db.query(fetchBookByCategoryQuery, [userId, bookCategory]);
        console.log("fetchBookByCategoryData", fetchBookByCategoryData);
        return fetchBookByCategoryData;
    }
    catch (err) {
        console.log(err);
        throw new Error("Internal error");

    }
    finally {
        await db.close();
    }
}


const fetchBookBySearchTextModel = async (userId, searchText) => {
    const db = makeDb();
    try {
        const fetchBookBySearchTextQuery = `
            SELECT 
                book_details.id AS id,
                book_details.copies_remaining AS count,
                book_category.category AS category,
                book_details.book_name AS bookName,
                CONVERT( book_details.book_image USING UTF8) AS bookImage,
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
                        user_details_id = ? AND status = 'taken')
                        AND book_details.book_name LIKE '%${searchText}%'
        `;

        const fetchBookBySearchTextData = await db.query(fetchBookBySearchTextQuery, [userId]);
        console.log("fetchBookBySearchTextData", fetchBookBySearchTextData);
        return fetchBookBySearchTextData;
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
    fetchBookByCategorymodel, fetchBookBySearchTextModel
}