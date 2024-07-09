const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const User = require("../model/user"); // Adjust the path as necessary
const UploadedImage = require("../model/uploadedImage"); // Adjust the path as necessary
const router = express.Router();

// Configure multer for local file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "../uploads");
    fs.mkdirSync(uploadPath, { recursive: true }); // Ensure the directory exists
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Append extension
  },
});

const upload = multer({ storage: storage });

// API endpoint to handle image upload and location data
router.post("/upload", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  // Extracting location data from the request body
  const { latitude, longitude, userId } = req.body;
  if (!latitude || !longitude || !userId) {
    return res.status(400).send("Location data or userId is missing.");
  }

  try {
    // Generate the local file URL
    const imageUrl = `/uploads/${req.file.filename}`;

    // Create a new record in the database
    await UploadedImage.create({
      image: imageUrl,
      latitude: latitude,
      longitude: longitude,
      userId: userId,
    });

    console.log("File has been received:", req.file.originalname);
    console.log(`Location: Latitude ${latitude}, Longitude ${longitude}`);

    // Respond with success message including location data
    res.send({
      message: "Image and location uploaded successfully",
      fileName: req.file.originalname,
      location: {
        latitude,
        longitude,
      },
    });
  } catch (error) {
    console.error("Error saving to database:", error);
    res.status(500).send("Error saving the image and location data.");
  }
});

router.get("/location-data", async (req, res) => {
  try {
    const locations = await UploadedImage.findAll({
      include: {
        model: User, // Include the User model
        attributes: ["name"], // Select the 'name' attribute from User
      },
    });

    // Format the response data to send to the client
    const formattedLocations = locations.map((location) => ({
      id: location.id,
      image: location.image,
      latitude: location.latitude,
      longitude: location.longitude,
      userName: location.User.name, // Access the User's name
    }));

    res.json(formattedLocations);
  } catch (error) {
    console.error("Error fetching location data:", error);
    res.status(500).send("Error fetching location data.");
  }
});

module.exports = router;