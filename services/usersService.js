const usersDao = require("../models/usersDao")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { SECRET_KEY } = process.env

// 회원가입
const signUpService = async (account, password, name, phone, birth) => {
    const isUserIdExisted = await usersDao.getUserByAccount(account);
    if(isUserIdExisted) { // user 있는지 확인
        const err = new Error("USER_EXISTED")
        err.statusCode = 400
        throw err;
    }

    const isUserPhoneExisted = await usersDao.getUserByPhone(phone);
    if(isUserPhoneExisted) { // phone number로 user 확인
        const err = new Error("USER_EXISTED")
        err.statusCode = 400
        throw err;
    } 
    else if(!isUserIdExisted && !isUserPhoneExisted) { // 둘 다 없으면
    const salt = bcrypt.genSaltSync(15)
    const hashedPw = bcrypt.hashSync(password, salt)

    const user = await usersDao.createUser(account, hashedPw, name, phone, birth);
    return user;
    }
}


// 로그인
const logInService = async (account, password) => {
    const userIdPw = await usersDao.getUserByAccount(account);
    if(!userIdPw) {
        const err = new Error("NO_USER_EXISTED")
        err.statusCode = 400;
        throw err;
    }
    
    const isPasswordCorrect = bcrypt.compareSync(password, userIdPw.password)

    if(!isPasswordCorrect) {
        const err = new Error("PASSWORD_INCORRECTED")
        err.statusCode = 400
        throw err;
    } else if(isPasswordCorrect) {
        const token = jwt.sign({ userAccount: userIdPw.account}, SECRET_KEY , { expiresIn: '20m' })
        return token;
    }
}



module.exports = { signUpService, logInService }