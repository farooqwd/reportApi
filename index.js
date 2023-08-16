const express = require("express");
const cors = require("cors");
const report = require("./routes/report");
const connectDb = require("./db");
const app = express();
// cors
app.use(
  cors({
    origin: "*",
  })
);
// connection to db
connectDb();
// routes
app.use("/api/report/submit", report);
app.get("/", (req, res) => {
  res.send("hi");
});
// app
app.listen(3333, () => console.log("running on port 3333"));
