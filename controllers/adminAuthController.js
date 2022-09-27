require('dotenv').config();
const jwt = require('jsonwebtoken');

const adminAuthModel = require('../models/adminAuthModel')

const adminLoginController = async (req, res) => {
    try {
        const userName = req.body.userName;
        const password = req.body.password;
        const result = await adminAuthModel.adminLoginModel(userName, password)

        if (result.length != 0) {
            const user = { username: userName };
            const accessTocken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
            console.log(accessTocken);

            return res.json(
                {
                    result: result,
                    accessKey: accessTocken,
                    success: true
                }
            );

        }
        
        return res.json(
            {
                result: result,
                accessKey: '',
                success: false
            }
        );

    }
    catch (err) {
        return res.status(500).json({ success: false })
    }

}




module.exports = {
    adminLoginController
}