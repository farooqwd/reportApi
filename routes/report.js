const { Router } = require("express");
// const report = require("../schemas/report");
const mongoose = require("mongoose");

const router = Router();

const issueSchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});
const Issue = mongoose.model("Issue", issueSchema);

router.post("/submit", async (req, res) => {
  try {
    // const { title, description, location } = req.body;
    // console.log(req);
    // console.log(description);
    const newIssue = new Issue({
      title: "title",
      description: "desc",
      location: "test",
    });
    // console.log(title);
    await newIssue.save();
    res.status(201).json({ message: "Issue added successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
    console.log("new error");
  }
});
module.exports = router;
