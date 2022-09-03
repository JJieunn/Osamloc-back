const usersService = require("../services/usersService")

// 회원가입
const signUpController = async (req, res) => {
    const { account, password, name, phone, birth } = req.body;
    // keyError
    if(!(account && password && name && phone && birth)) {
        res.status(400).json({ err: "INPUT_ERROR" })
        return;
    }

    try {
        await usersService.signUpService(account, password, name, phone, birth)
        res.status(201).json({ message: "USER_CREATED" })
    } catch (err) {
        console.log(err)
        res.status( err.statusCode || 500).json({ err: err.message })
    }
}


// 로그인
const logInController = async (req, res) => {
    const { account, password } = req.body;
    // keyError
    if(!(account && password)) {
        res.statusCode(400).json({ err: "INPUT_ERROR" })
    }
    
    try{
        const token = await usersService.logInService(account, password)
        res.status(200).json({ token })
    }
    catch (err) {
        console.log(err)
        res.status( err.statusCode || 500 ).json({ err: err.message});
    }
}


module.exports = { signUpController, logInController }