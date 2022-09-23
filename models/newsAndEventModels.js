const makeDb = require('../library/db');

const newsAndEventsModel = async () => {
    const db = makeDb();
    try {
        const newsAndEventsQuery = `select * from news_and_events`;
        const newsAndEventsData = await db.query(newsAndEventsQuery);
        return newsAndEventsData;

    }
    catch (err) {
        console.log("the error", err);
        throw new Error('internal error')
    }
    finally {
        await db.close();
    }
}

module.exports = { newsAndEventsModel }