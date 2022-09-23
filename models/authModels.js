const makeDb = require('../library/db');

const loginModel = async (loginData) => {
    const db = makeDb();
    try {
        console.log(loginData);
        const loginUserQuery = `SELECT id,email FROM user_details where email = ? AND password =md5(?)`;
        const logedUserData = await db.query(loginUserQuery, loginData);
        return logedUserData;

    }
    catch (err) {
        console.log("the error", err);
        throw new Error("server Error");
    }
    finally {
        await db.close();
    }
};

const signupModel = async (regUserData) => {
    const db = makeDb();
    try {
        const regUserQuery = 'INSERT INTO user_details(first_name, last_name, email, phone, house_name, city, district, post, pin, password)values(?,?,?,?,?,?,?,?,?,md5(?))';
        await db.query(regUserQuery, regUserData);
    }
    catch (err) {
        console.log(err);
        throw new Error("server Error");
    }
    finally {
        await db.close();
    }

};

module.exports = {
    loginModel,
    signupModel
};