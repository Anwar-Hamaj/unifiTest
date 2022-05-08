const formData = require("multer")().array();
const { signUp, login } = require("../controllers/auth");
const { validateLogin , validateSignUp } = require("../middleware/auth");
const router = require("express").Router();

router.post("/sign-up", formData, validateSignUp, signUp);

router.get("/log-in", formData, validateLogin, login);

module.exports = router;
