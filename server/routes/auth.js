const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const admin = require("../firebaseAdmin");
const bcrypt = require("bcrypt");

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_key";


// ---------------- GOOGLE LOGIN ----------------
router.post("/google", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ success:false, message:"No token" });

    const decoded = await admin.auth().verifyIdToken(token);

    let user = await User.findOne({ email: decoded.email });

    if (!user) {
      user = await User.create({
        name: decoded.name || "Google User",
        email: decoded.email,
        password: "GOOGLE_AUTH",
        provider: "google"
      });
    }

    const jwtToken = jwt.sign(
      { id: user._id },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ success:true, token: jwtToken });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success:false, message:"Google login failed" });
  }
});

// SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (await User.findOne({ email }))
      return res.json({ success:false, message:"User already exists" });

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hash,
      provider: "local"
    });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn:"7d" });

    res.json({ success:true, token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success:false });
  }
});


// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.json({ success:false });

    if (user.provider === "google")
      return res.json({ success:false, message:"Use Google Login" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.json({ success:false });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn:"7d" });

    res.json({ success:true, token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success:false });
  }
});


module.exports = router;
