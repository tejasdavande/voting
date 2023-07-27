const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user");

module.exports = async (req, res, next) => {
  let tokenis = req.headers.authorization;
  if (!tokenis) {
    res
      .status(401)
      .json({ message: "please provide valid token to access this" });
  }
  try {
    let token = tokenis.split(" ")[1];
    const decoded = await jwt.verify(token, process.env.PRIVATEKEY);
    const { user } = decoded;
    console.log(user);
    next();
  } catch (error) {
    return next(
      new ErrorResponse("you must login to access this resources", 401)
    );
  }
};
