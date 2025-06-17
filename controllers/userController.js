const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

const registerUser = async (req, res) => {
  const { name, email, password, isAdmin } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).send({ message: "User already exists" });
    const hash = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hash, isAdmin });
    res.status(201).send({ 
        success:true,
        message: "User registered successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user.id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: "2h" }
    );
    res.send({ 
        success:true,
        token, message: "Login successful" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getUserInfo = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, { attributes: { exclude: ["password"] } });
    if (!user) return res.status(404).send({ message: "User not found" });
    res.send(user);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports ={
    registerUser,
    loginUser,
    getUserInfo
}