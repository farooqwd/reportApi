const express = require("express");
const cors = require("cors");
const connectDb = require("./db");
const mongoose = require("mongoose");
const app = express();
// cors
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
    credentials: true,
    exposedHeaders: ["Content-Length", "X-Pagination"],
    maxAge: 86400,
  })
);
// connection to db
connectDb();
app.get("/", (req, res) => {
  res.send("hi");
});

// //////////////////Post Request
// /////////////////Schema
const issueSchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  // createdAt: {
  //   type: Date,
  //   default: new Date(),
  // },
});
const Issue = mongoose.model("Issue", issueSchema);

// /////////////////////////////Post route
app.post("/api/report/submit", async (req, res) => {
  try {
    const { title, description, location } = req.body;
    res.send({ title, description, location });
    await Issue.create({ title, description, location });
    res.status(201).json({ message: "Issue added successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
    console.log("new error");
  }
});

// app
app.listen(3333, () => console.log("running on port 3333"));
