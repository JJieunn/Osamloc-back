const express = require("express")
const usersController = require("../controllers/usersController")
const router = express.Router()


// sign up
router.post("/signup", usersController.signUpController)

// sign up 할 때 account 중복 조회
router.get("/signup", usersController.isAccountExisted)

// log in
router.post("/login", usersController.logInController)


module.exports = router;
