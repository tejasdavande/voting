const mongoose = require("mongoose");
require("dotenv").config();

const connectedDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.URL);
    console.log(
      "Database connected succesfully",
      connect.connection.host,
      connect.connection.name
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectedDb;
