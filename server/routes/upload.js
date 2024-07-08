// Assuming you are using Express.js and have a router setup
const express = require("express");
const multer = require("multer");
const router = express.Router();

// Configure multer for file storage
const storage = multer.memoryStorage(); // Using memory storage to handle blob directly
const upload = multer({ storage: storage });

// API endpoint to handle image upload
router.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  // Process the file here (e.g., save to database, further processing, etc.)
  console.log("File has been received:", req.file.originalname);

  // Respond with success message
  res.send({
    message: "Image uploaded successfully",
    fileName: req.file.originalname,
  });
});

module.exports = router;
