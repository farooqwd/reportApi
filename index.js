const express = require("express");
const cors = require("cors");
const connectDb = require("./db");
const mongoose = require("mongoose");
const app = express();
// cors
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
// connection to db
connectDb();
// //////////////////Post Request
// /////////////////Schema
const issueSchema = new mongoose.Schema({
  _id: String,
  title: String,
  description: String,
  location: String,
  image: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});
const Issue = mongoose.model("Issue", issueSchema);

// /////////////////////////////Post route
app.post("/api/report/submit", async (req, res) => {
  try {
    const { title, description, location, image } = req.body;
    // console.log(title, description, location, image);
    const count = await Issue.countDocuments();
    const newId = `rep${String(count + 1).padStart(3, "0")}`;
    await Issue.create({ _id: newId, title, description, location, image });
    res.status(201).json({ message: newId });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
    console.log("new error");
  }
});

// ////////////////////////get req
app.get("/api/issues", async (req, res) => {
  try {
    const issues = await Issue.find({}).sort({ createdAt: -1 }); // Sorting in descending order
    res.json(issues);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

// app
app.listen(3333, () => console.log("running on port 3333"));
