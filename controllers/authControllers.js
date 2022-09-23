require('dotenv').config();
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const authModels = require('../models/authModels')

const userSignup = async (req, res) => {
    const reqData = req.body;
    const regUserData = [
        reqData.firstName,
        reqData.lastName,
        reqData.email,
        reqData.phone,
        reqData.houseName,
        reqData.city,
        reqData.district,
        reqData.post,
        reqData.pin,
        reqData.password
    ];

    const valError = validationResult(req);

    if (!valError.isEmpty()) {
        console.log(valError);
        return res.status(400).json({ errors: valError.array() });
    }
    try {
        await authModels.signupModel(regUserData);
        return res.send("success");
    }
    catch (err) {
        return res.status(500).json({ success: false })
    }

}

const userLogin = async (req, res) => {

    console.log("helloooo");
    const reqData = req.body;
    const loginUserData = [
        reqData.userName,
        reqData.userPwd
    ];

    const valError = validationResult(req);

    if (!valError.isEmpty()) {
        console.log("VAL ERROR", valError.array()[0].msg);

        // res.status(400).send({ error: valError.array()[0].msg });
        return res.json(
            {
                result: '',
                accessKey: '',
                success: false,
                error: valError.array()[0].msg
            }
        )
    } else {
        try {
            const result = await authModels.loginModel(loginUserData);
            console.log("THE RESULT", result, typeof result);

            if (result.length != 0) {
                const user = { username: reqData.userName };
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
        }
        catch (err) {
            return res.status(500).json({ success: false })
        }

        return res.json(
            {
                result: result,
                accessKey: '',
                success: false
            }
        );
    }

}

module.exports = {
    userLogin,
    userSignup
}