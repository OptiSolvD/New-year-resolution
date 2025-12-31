const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth");


// GET CURRENT USER
router.get("/me", auth, async (req, res) => {

  const user = await User.findById(req.userId);

  res.json(user);
});


// SAVE RESOLUTION
router.post("/save", auth, async (req, res) => {

  const { resolution } = req.body;

  const result = await User.findByIdAndUpdate(
    req.userId,
    { 
      $push: { resolutions: { text: resolution } } 
    },
    { new:true }
  );

  res.json({ success:true, resolutions: result.resolutions });
});


// GET ALL RESOLUTIONS
router.get("/all", auth, async (req, res) => {

  const user = await User.findById(req.userId);

  res.json(user.resolutions);
});


// EDIT RESOLUTION
router.put("/edit/:resId", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    const resolution = user.resolutions.id(req.params.resId);

    if (!resolution)
      return res.status(404).json({ msg: "Resolution not found" });

    resolution.text = req.body.text;

    await user.save();

    res.json(user);

  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});


// DELETE RESOLUTION
router.delete("/delete/:resId", auth, async (req, res) => {

  await User.findByIdAndUpdate(
    req.userId,
    { $pull: { resolutions:{ _id: req.params.resId } } }
  );

  res.json({ success:true });
});


// TOGGLE COMPLETE
router.put("/toggle/:resId", auth, async (req,res)=>{

  const user = await User.findById(req.userId);

  const resItem = user.resolutions.id(req.params.resId);

  resItem.completed = !resItem.completed;
  resItem.progress = resItem.completed ? 100 : 0;

  await user.save();

  res.json(resItem);
});


// UPDATE PROGRESS
router.put("/progress/:resId", auth, async (req,res)=>{

  const { progress } = req.body;

  const user = await User.findById(req.userId);

  const resItem = user.resolutions.id(req.params.resId);

  resItem.progress = progress;
  resItem.completed = progress == 100;

  await user.save();

  res.json(resItem);
});


module.exports = router;
