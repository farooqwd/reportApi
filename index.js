const express = require("express");
const cors = require("cors");
const connectDb = require("./db");
const mongoose = require("mongoose");
const multer = require("multer");
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
  title: String,
  description: String,
  location: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});
const Issue = mongoose.model("Issue", issueSchema);

app.get("/api/issues", async (req, res) => {
  try {
    const issues = await Issue.find({}).sort({ createdAt: -1 }); // Sorting in descending order
    res.json(issues);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

// /////////////////////////////Post route
// app.post("/api/report/submit", async (req, res) => {
//   try {
//     const { title, description, location } = req.body;
//     console.log(title, description, location);
//     await Issue.create({ title, description, location });
//     res.status(201).json({ message: "Issue added successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "An error occurred" });
//     console.log("new error");
//   }
// });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `images/${file.originalname}`);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post("/api/report/submit", async (req, res) => {
  try {
    const { title, description, location, image } = req.body;
    console.log(title, description, location, image);
    if (!image) {
      await Issue.create({ title, description, location });
    }
    const imagePath = await upload.single("image", req);
    await Issue.create({
      title,
      description,
      location,
      imagePath,
    });
    res.status(201).json({ message: "Issue added successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
    console.log("new error");
  }
});

// app
app.listen(3333, () => console.log("running on port 3333"));
