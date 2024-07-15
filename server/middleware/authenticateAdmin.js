const jwt = require("jsonwebtoken");
const Admin = require("../model/admin");

const authenticateAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Get the token from the Authorization header

  if (!token) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findByPk(decoded.id);

    if (!admin) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    req.admin = admin;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(403).json({ message: "Unauthorized" });
  }
};

module.exports = authenticateAdmin;
