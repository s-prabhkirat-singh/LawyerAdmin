const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const { User } = require('../models');  // Import User model
const auth = require("../middleware/auth");
const dotenv = require("dotenv");

dotenv.config();

const { ACCOUNT_SID, AUTH_TOKEN, JWT_SECRET } = process.env;



const register = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(401).json({ errors: errors.array() });
  }

  try {
    const existingUser = await User.findOne({ where: { email: req.body.email } });

    if (existingUser) {
      return res.status(409).send({ msg: "This user is already in use" });
    }

    const hash = await bcrypt.hash(req.body.password, 10);

    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash,
      username: req.body.username,
    });

    return res.status(200).json({ msg: "User registered successfully" });
  } catch (err) {
    console.log("Database error:", err);
    return res.status(500).send({ msg: "Database error" });
  }
};

const login = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(401).json({ errors: errors.array() });
  }

  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (!user) {
      return res.status(401).send({ msg: "Entered password or email is incorrect!" });
    }

    const match = await bcrypt.compare(req.body.password, user.password);

    if (match) {
      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
      return res.status(200).send({ msg: 'Logged in successfully', token });
    } else {
      return res.status(401).send({ msg: "Entered password or email is incorrect!" });
    }
  } catch (err) {
    return res.status(401).send({ msg: err });
  }
};

const checkPass = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.query.email } });

    if (user) {
      res.send("You are registered!");
    } else {
      res.send("Your listed email number is not registered");
    }
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).send("Database error");
  }
};

const updatePass = async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);

    await User.update({ password: hash }, { where: { email: req.body.email } });

    return res.status(200).send({ msg: "The password has been updated" });
  } catch (err) {
    console.log("error in hashing:", err);
    return res.status(500).send({ msg: "Error updating password" });
  }
};

const logout = (req, res) => {
  const authToken = req.headers.authorization.split(" ")[1];
  const decode = jwt.verify(authToken, JWT_SECRET);

  // No need for a database query to log out
  res.clearCookie('token');
  return res.status(200).send({ msg: "Logged out successfully" });
};

const getUser = async (req, res) => {
  const authToken = req.headers.authorization.split(" ")[1];
  const decode = jwt.verify(authToken, JWT_SECRET);

  try {
    const user = await User.findAll();

    return res.status(200).send({
      success: true,
      data: user,
      message: "Fetch Successfully",
    });
  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).send({ msg: "Database error" });
  }
};

module.exports = {
  register,
  login,
  checkPass,
  updatePass,
  logout,
  getUser
};
