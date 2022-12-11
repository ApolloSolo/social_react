const pg = require("../db/connection");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateJWT");

const register = async (req, res) => {
  try {
    const { username, email, password, confirmPassword, name } = req.body;

    if (!username || !email || !password || !confirmPassword || !name) {
      throw new Error("Please input all fields");
    }

    const text = "SELECT id FROM users WHERE email = $1";
    const value = [email];
    const existingUser = await pg.query(text, value);

    if (existingUser.rowCount > 0) {
      res.status(401);
      throw new Error("User exists");
    }

    // CREATE NEW USER
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUserStr =
      "INSERT INTO users(username, email, passhash, name) VALUES($1, $2, $3, $4)  RETURNING *";
    const values = [username, email, hashedPassword, name];

    const newUser = await pg.query(newUserStr, values);

    if (newUser.rowCount < 1) {
      res.status(500);
      throw new Error("An account could not be created at this time");
    }

    res.status(200).json(newUser.rows[0]);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Please input all fields");
    }

    const text =
      "SELECT id, name, username, email, passhash FROM users WHERE email = $1";
    const value = [email];
    const existingUser = await pg.query(text, value);

    if (existingUser.rowCount < 0) {
      res.status(401);
      throw new Error("User exists");
    }

    const isCorrectPassword = await bcrypt.compare(
      password,
      existingUser.rows[0].passhash
    );

    if (!isCorrectPassword) {
      res.status(400);
      throw new Error("Incorrect Credentials");
    }

    const token = generateToken(existingUser.rows[0]);

    res.cookie("accessToken", token, {
      httpOnly: true
    });

    res.json({
      username: existingUser.rows[0].username,
      name: existingUser.rows[0].name,
      email: existingUser.rows[0].email,
      token
    });
  } catch (error) {
    res.json({ error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("accessToken", {
        secure: true,
        sameSite: "none"
      });
    
      res.status(201).json({message: "Logged out"})
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = { login, register, logout };
