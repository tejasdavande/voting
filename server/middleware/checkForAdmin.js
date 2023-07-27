const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
  let tokenis = req.headers.authorization;
  if (!tokenis) {
    res
      .status(401)
      .json({ message: "please provide valid token to access this" });
  }
  try {
    let token = tokenis.split(" ")[1]; //authorization should be in small//
    const decoded = await jwt.verify(token, process.env.PRIVATEKEY);
    const { user } = decoded;
    const allowed_peoples = ["admin","Admin","ADMIN"];
    if (allowed_peoples.includes(user.user_type)) {
      next();
    } else {
      console.log("Access is not allowed");
      res.status(401).json({ message: "Access is not allowed" });
    }
    //use of this is to call next middleware and stop current request and response cycle//
  } catch (error) {
    return res.status(401).json({ error, message: "AUTH Failed" });
  }
};
