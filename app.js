const express = require('express');
const morgan = require('morgan')

const authRouters = require('./routers/authRouters');
const newsAndEventsRouter = require('./routers/newsAndEventRouters');
const bookListRouter = require('./routers/bookListRouters');
const booksTakenRouter = require('./routers/takenBooksRouters');
const searchAndCategoryRouter = require('./routers/searchAndCategoryRouters');
const adminRoute = require('./routers/adminRoutes');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(morgan('dev'))
app.use(express.json());

app.use('/auth', authRouters);
app.use('/news_and_events', newsAndEventsRouter);
app.use('/book_list', bookListRouter);
app.use('/books_taken', booksTakenRouter);
app.use('/search', searchAndCategoryRouter);
app.use('/admin',adminRoute);

app.listen(3001, () => {
    console.log("Running on port:3001 .....");
});
