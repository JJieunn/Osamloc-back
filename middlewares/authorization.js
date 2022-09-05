Authorization.js

const { getUserByAccount } = require("../models/usersDao")
// dao에 있는 user검색 함수 사용
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env


const validateToken = async (req, res, next) => {
    try {
        const access_token = req.headers["authorization"];

        if(!access_token) {
            res.status(401).json({ err: "TOKEN_NOT_PROVIDED" })
        }

        const userId = jwt.verify(access_token, SECRET_KEY)
        // 토큰 속 account를 가진 user가 있는지 체크
        const foundUser = await getUserByAccount(userId.userAccount)
        console.log("user : ", foundUser)
        if(foundUser) {
            req.foundUser = foundUser // 토큰 속 정보를 controller에 보내는 req로 할당
            next()
        } else if(foundUser === undefined) {
            const err = new Error("NO_AUTHORIZATION")
            err.statusCode = 400
            throw err;
        }
    } catch(err) {
        console.log(err)
        res.status(400).json({ err: "INVALID_TOKEN" })
    }
} 

module.exports = { validateToken }