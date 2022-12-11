const pg = require("../db/connection")

const getAllUsers = async (req, res) => {
    res.send("ALL USERS")
}

module.exports = {getAllUsers}