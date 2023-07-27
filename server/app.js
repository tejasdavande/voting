const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorhandler");

//call of database function
const connectedDb = require("./common/db");
connectedDb();

const app = express();

//For body Parsing//
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

// Routes Handlers //
const candidateroutes = require("./routes/candidate");
const userroutes = require("./routes/user");


//middlewares//
app.use(cors());
app.use("/candidate", candidateroutes);
app.use("/user", userroutes);
app.use(errorHandler);

module.exports = app;
