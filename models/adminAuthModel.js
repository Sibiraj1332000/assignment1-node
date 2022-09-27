const makeDb = require('../library/db');

const adminLoginModel = async (userName, password) => {
    const db = makeDb();
    try {
        console.log("Admin :  ", userName, password);
        const adminLoginQuery = 'SELECT id,name FROM admin_user WHERE name=? AND password=md5(?)';
        const adminLoginData = await db.query(adminLoginQuery,[userName,password])
        console.log("adminLoginData",adminLoginData[0]);
        return adminLoginData;
    }
    catch (err) {
        console.log("the error", err);
        throw new Error("server Error");
    }
    finally {
        await db.close();
    }

}

module.exports = { adminLoginModel }