const path = require('path')
require('dotenv').config({ path: path.resolve(`./.env.${process.env.NODE_ENV}`) })

module.exports = {
    user: process.env.USER,
    host: process.env.HOST,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}