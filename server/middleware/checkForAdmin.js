const jwt = require("jsonwebtoken");
require("dotenv").config();

const ALLOWED_ROLES = ["admin", "Admin", "ADMIN"];

/**
 * Verifies the Bearer JWT AND that the user is an admin.
 */
module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Please provide a valid token to access this" });
  }

  try {
    const decoded = jwt.verify(token, process.env.PRIVATEKEY);
    req.myValue = decoded.user;

    if (req.myValue && ALLOWED_ROLES.includes(req.myValue.user_type)) {
      return next();
    }
    return res.status(403).json({ message: "Access is not allowed" });
  } catch (error) {
    return res.status(401).json({ message: "Authentication failed" });
  }
};
