const users = require("../models/userSchema");
const { v4: uuidv4 } = require("uuid");
const { setTokenForUser } = require("../services/authentication.js");

const userSignup = async (req, res) => {
  const { fullName, email, password, phoneNumber } = req.body;
  if (!fullName || !email || !password) {
    res.status(400).json({ message: "field missing" });
  }
  try {
    await users.create({
      name: fullName,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
    });

    res.status(200).json({ message: "Successfully created user" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await users.matchPasswordandGenerateToken(email, password);

    res.cookie("sessionId", token, {
      path: "/",
    });
    return res.status(200).json({ message: "Success" });
  } catch (error) {
    return res.status(500).json({ serverError: "Server Error" });
  }
};

module.exports = { userSignup, userLogin };
