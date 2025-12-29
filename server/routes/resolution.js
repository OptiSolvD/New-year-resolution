const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth");
router.get("/me", auth, async (req, res) => {

  const userId = req.user.id || req.user._id;

  const user = await User.findById(userId);

  res.json(user);
});


// SAVE DATA
router.post("/save", auth, async (req, res) => {

  console.log("TOKEN PAYLOAD:", req.user);

  const { resolution } = req.body;

  const result = await User.findByIdAndUpdate(
    req.user.id,
    { 
      $push: { resolutions: { text: resolution } } 
    },
    { new:true }
  );

  res.json({ success:true, resolutions: result.resolutions });
});


// GET ALL
router.get("/all", auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user.resolutions);
});


// DELETE
router.delete("/delete/:resId", auth, async (req, res) => {
  await User.findByIdAndUpdate(
    req.user.id,
    { $pull: { resolutions:{ _id: req.params.resId } } }
  );

  res.json({ success:true });
});


// 🟢 THIS MUST BE LAST
module.exports = router;
