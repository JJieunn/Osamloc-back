const express = require("express")
const usersController = require("../controllers/usersController")
const router = express.Router()


// sign up
router.post("/signup", usersController.signUpController)

// log in
router.post("/login", usersController.logInController)


module.exports = router;
