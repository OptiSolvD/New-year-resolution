const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
require("dotenv").config();


const authRoutes = require("./routes/auth");
const resRoutes = require("./routes/resolution");

// --- CONNECT TO DATABASE ---
mongoose.connect("mongodb://127.0.0.1:27017/newyear")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("DB connection error:", err));

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// --- TEST ROUTE ---
app.post("/api/save", (req, res) => {
  console.log("User:", req.body.name);
  res.json({ success: true });
});

// --- FEATURE ROUTES ---
app.use("/api/auth", authRoutes);
app.use("/api/resolution", resRoutes);

// --- START SERVER ---
app.listen(5000, () => console.log("Server running on port 5000"));
