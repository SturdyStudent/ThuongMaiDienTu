var express = require("express");
const AuthController = require("../controllers/ClientAuthController");
const verifyJWTMiddleware = require("../middlewares/verifyJWT");

var router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/verify-otp", AuthController.verifyConfirm);
router.post("/resend-verify-otp", AuthController.resendConfirmOtp);
router.get("/isAdminAuth", verifyJWTMiddleware, AuthController.isAuth);

module.exports = router;