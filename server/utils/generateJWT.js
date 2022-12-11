const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = ({ id, name, username, email }) => {
  const payload = { id, name, username, email };
  return jwt.sign({ data: payload }, process.env.JWT_SECRET, {
    expiresIn: "12h",
  });
};

module.exports = { generateToken };