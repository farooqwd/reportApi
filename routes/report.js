const { Router } = require("express");
const report = require("../schemas/report");

const router = Router();

router.post("/submit", async (req, res) => {
  try {
    const { title, description, location } = req.body;
    const newIssue = new report({
      title,
      description,
      location,
    });

    await newIssue.save();
    res.status(201).json({ message: "Issue added successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});
module.exports = router;
