const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log("Token from cookie:", token);
    if (!token) return res.status(401).send("You must be logged in");

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    console.log("Decoded JWT:", decoded);

    req.user = decoded;
    next();
  } catch (err) {
    console.error("Token verification failed:", err.message);
    return res.status(401).send("Invalid or expired token");
  }
};

module.exports = authMiddleware;
