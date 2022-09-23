const express = require('express');
const cors = require('cors');

const authRouters = require('./routers/authRouters');
const newsAndEventsRouter = require('./routers/newsAndEventRouters');
const bookListRouter = require('./routers/bookListRouters');
const booksTakenRouter = require('./routers/takenBooksRouters');
const { search } = require('./routers/authRouters');
const searchAndCategoryRouter = require('./routers/searchAndCategoryRouters')
// const { use } = require('./routers/authRouters');


const app = express();
// app.use(cors());
const logRequestStart = (req, res, next) => {

    console.info(`REQUEST  ${req.method} ${req.originalUrl}`);
    console.log("=======================================");

    next()
}

app.use(logRequestStart)

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(express.json());

app.use('/auth', authRouters);
app.use('/news_and_events', newsAndEventsRouter);
app.use('/book_list', bookListRouter);
app.use('/books_taken', booksTakenRouter);
app.use('/search', searchAndCategoryRouter);

app.listen(3001, () => {
    console.log("Running on port:3001 .....");
});
