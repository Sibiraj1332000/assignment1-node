const util = require('util');
const mysql = require('mysql');

const config = require('../config/config');

const makeDb = () => {
   
    const connection = mysql.createConnection({
        user: config.user,
        host: config.host,
        password: config.password,
        database: config.database
    });

    return {
        query(sql, args) {
            return util.promisify(connection.query)
                .call(connection, sql, args);
        },
        close() {
            return util.promisify(connection.end).call(connection);
        }
    };
}

module.exports = makeDb;