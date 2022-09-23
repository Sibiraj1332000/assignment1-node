const util = require('util');
const mysql = require('mysql');
const makeDb = () => {
    const config = {
        user: 'root',
        host: 'localhost',
        password: 'password',
        database: 'library_database'
    };
    const connection = mysql.createConnection(config);
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