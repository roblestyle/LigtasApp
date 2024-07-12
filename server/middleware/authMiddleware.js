// middleware/authMiddleware.js

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Verify JWT token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach decoded user information to the request object
    next(); // Move to the next middleware or route handler
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = verifyToken;
