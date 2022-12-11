const router = require("express").Router();
const { login, logout, register } = require("../../controllers/authControllers");

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);

module.exports = router;
