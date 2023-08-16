const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(
      "mongodb+srv://farooqwebd:NpRZe0aKIYvicguP@issues.najz3ag.mongodb.net/"
    );
    console.log("database connected");
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectDb;
