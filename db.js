const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(
      "mongodb+srv://farooqwebd:VT99yA1K4Zlsi1Ip@issues.najz3ag.mongodb.net/reports"
    );
    console.log("database connected");
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectDb;
