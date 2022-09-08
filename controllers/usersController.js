const usersService = require("../services/usersService")

// 회원가입
const signUpController = async (req, res) => {
    const { account, password, name, phone, birth } = req.body;
    // keyError
    if(!(account && password && name && phone && birth)) {
        res.status(400).json({ error: "INPUT_ERROR" })
        return;
    }

    try {
        await usersService.signUpService(account, password, name, phone, birth)
        res.status(201).json({ message: "USER_CREATED" })
    } catch (error) {
        console.log(error)
        res.status( error.statusCode || 500 ).json({ error: error.message })
    }
}

// 회원가입 - account 중복 체크
const isAccountExisted = async (req, res) => {
    const { account } = req.body;
    // keyError
    if(!account) {
        res.status(400).json({ error: "INPUT_ERROR" })
        return;
    }

    try {
        await usersService.isAccountExisted(account);
        res.status(200).json({ message: "THIS_ACCOUNT_CAN_USE"})
    } catch (error){
        res.status( error.statusCode || 500 ).json({ error: error.message })
    }
}


// 로그인
const logInController = async (req, res) => {
    const { account, password } = req.body;
    // keyError
    if(!(account && password)) {
        res.status(400).json({ error: "INPUT_ERROR" })
        return;
    }
    
    try{
        const token = await usersService.logInService(account, password)
        res.status(200).json({ message: "LOGIN_SUCCESS", token })
    }
    catch (error) {
        console.log(error)
        res.status( error.statusCode || 500 ).json({ error: error.message});
    }
}


module.exports = { signUpController, isAccountExisted, logInController }