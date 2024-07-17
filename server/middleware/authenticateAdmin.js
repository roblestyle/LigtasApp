const jwt = require("jsonwebtoken");
const Admin = require("../model/admin");

const authenticateAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findByPk(decoded.id);

    if (!admin) {
      return res.status(403).json({ message: "Unauthorized: Admin not found" });
    }

    req.admin = admin; // Attach admin object to request for future use
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(403).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = authenticateAdmin;
