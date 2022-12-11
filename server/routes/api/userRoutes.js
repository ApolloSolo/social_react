const router = require("express").Router();
const {
    getAllUsers
} = require("../../controllers/userControllers");
const protected = require("../../middleware/authMiddleware");

router.get("/", getAllUsers);


module.exports = router;