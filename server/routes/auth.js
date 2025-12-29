const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "secret123";


// SIGNUP
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  // 1️⃣ Check if email already exists
  const exists = await User.findOne({ email });
  if (exists) {
    return res.json({
      success: false,
      message: "User already exists"
    });
  }

  // 2️⃣ Hash password
  const hash = await bcrypt.hash(password, 10);

  // 3️⃣ Create user
  const user = await User.create({
    name,
    email,
    password: hash
  });

  // 4️⃣ Create token
  const token = jwt.sign({ id: user._id }, JWT_SECRET);

  // 5️⃣ Send response
  res.json({
    success: true,
    token
  });
});


// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.json({ success:false });

  const match = await bcrypt.compare(password, user.password);

  if (!match) return res.json({ success:false });

  const token = jwt.sign({ id: user._id }, JWT_SECRET);

  res.json({ success:true, token });
});


module.exports = router;
