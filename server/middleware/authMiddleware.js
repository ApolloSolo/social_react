const jwt = require("jsonwebtoken");
const db = require("../db/connection");
require("dotenv").config();

const protected = async (req, res, next) => {
  let token;

  if (!req.headers.authorization) {
    throw new Error("Authorization headers not set");
  }

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const foundUser = await db.query(
        "SELECT users.id, users.username, users.email FROM users WHERE users.username = $1",
        [decoded.data.username]
      );

      if (foundUser.rows.length === 0) {
        throw new Error("User could not be varified");
      }

      req.user = foundUser.rows[0];

      next();
    } catch (error) {
      res.json({ error: error.message });
    }
  }
  
};

module.exports = protected;