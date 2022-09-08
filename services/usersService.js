const usersDao = require("../models/usersDao")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { SECRET_KEY } = process.env

// 회원가입
const signUpService = async (account, password, name, phone, birth) => {
    const isUserIdExisted = await usersDao.getUserByAccount(account);
    if(isUserIdExisted) { // user 있는지 확인
        const error = new Error("USER_EXISTED")
        error.statusCode = 400
        throw error;
    }

    const isUserPhoneExisted = await usersDao.getUserByPhone(phone);
    if(isUserPhoneExisted) { // phone number로 user 확인
        const error = new Error("USER_EXISTED")
        error.statusCode = 400
        throw error;
    } 
    else if(!isUserIdExisted && !isUserPhoneExisted) { // 둘 다 없으면
    const salt = bcrypt.genSaltSync(15)
    const hashedPw = bcrypt.hashSync(password, salt)

    const user = await usersDao.createUser(account, hashedPw, name, phone, birth);
    return user;
    }
}


// 회원가입 - account 중복 체크
const isAccountExisted = async (account) => {
    const checkRes = await usersDao.getUserByAccount(account);
    if(checkRes) {
        const error = new Error("ACCOUNT_EXISTED")
        error.statusCode = 400
        throw error;
    }

    return checkRes;
}


// 로그인
const logInService = async (account, password) => {
    const userIdPw = await usersDao.getUserByAccount(account);
    if(!userIdPw) {
        const error = new Error("NO_USER_EXISTED")
        error.statusCode = 400;
        throw error;
    }
    
    const isPasswordCorrect = bcrypt.compareSync(password, userIdPw.password)

    if(!isPasswordCorrect) {
        const error = new Error("PASSWORD_INCORRECTED")
        error.statusCode = 400
        throw error;
    } else if(isPasswordCorrect) {
        const token = jwt.sign({ userAccount: userIdPw.account}, SECRET_KEY , { expiresIn: '1d' })
        return token;
    }
}



module.exports = { signUpService, isAccountExisted, logInService }