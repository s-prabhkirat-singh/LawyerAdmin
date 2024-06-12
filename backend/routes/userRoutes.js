const express = require("express");
const router = express.Router();
const auth=require("../middleware/auth.js")
const { signUpValidation, loginValidation, updateValidation } = require("../helpers/validation");
const userController = require("../controllers/userController");

router.post("/register", signUpValidation, userController.register);
router.post("/login", loginValidation, userController.login);
router.post("/login/forgotPassword", signUpValidation, userController.checkPass);
router.post("/login/forgotPassword/updatePassword", updateValidation, userController.updatePass);
router.get("/get-user", auth.isAuthorize, userController.getUser);
router.post("/logout",auth.isAuthorize,userController.logout)


module.exports = router;
