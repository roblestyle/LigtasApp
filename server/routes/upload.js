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
  // if (!req.file) {
  //   return res.status(400).send("No file uploaded.");
  // }

  // Extracting location data from the request body
  const { latitude, longitude, userId, condition, message, campus, contactNumber } = req.body;
  if (!latitude || !longitude || !userId || !condition) {
    return res.status(400).send("Location data or userId or condition is missing.");
  }

  try {
    // Generate the local file URL only if an image was uploaded
    let imageUrl = null;
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`; // Only set imageUrl if a file exists
    }

    // Create a new record in the database
    await UploadedImage.create({
      image: imageUrl,
      latitude: latitude,
      longitude: longitude,
      userId: userId,
      condition: condition, // Store the condition (1 or 0)
      message: message,
      campus: campus, // Store the campus
      contactNumber: contactNumber // Store the contact number
    });

 console.log("File has been received:", req.file ? req.file.originalname : "No image uploaded");
    console.log(`Location: Latitude ${latitude}, Longitude ${longitude}`);

    // Respond with success message including location data
    res.send({
      message: "Image and location uploaded successfully",
      fileName: req.file ? req.file.originalname : "No image",
      location: {
        latitude,
        longitude,
      },
      condition: condition === "1" ? "is Safe" : "Needs Help", // Return the condition in human-readable form
      message: message,
      campus: campus, // Include campus in the response
      contactNumber: contactNumber // Include contact number in the response
    });
  } catch (error) {
    console.error("Error saving to database:", error);
    res.status(500).send("Error saving the image and location data.");
  }
});

// Route to update the condition to 'rescued' (2)
router.put("/send-help/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const marker = await UploadedImage.findByPk(id);
    if (!marker) {
      return res.status(404).json({ error: "Marker not found" });
    }

    // Update the condition to 2 (rescued)
    marker.condition = 2;
    await marker.save();

    res.json({ message: "Help sent successfully, marker updated to rescued" });
  } catch (error) {
    console.error("Error updating marker condition:", error);
    res.status(500).json({ error: "Error updating marker condition" });
  }
});

// Route to retract help (update the condition back to 'Needs Help' (1))
router.put("/retract-help/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const marker = await UploadedImage.findByPk(id);
    if (!marker) {
      return res.status(404).json({ error: "Marker not found" });
    }

    // Update the condition back to 1 (Needs Help)
    marker.condition = 0;
    await marker.save();

    res.json({ message: "Help retracted successfully, marker updated to Needs Help" });
  } catch (error) {
    console.error("Error updating marker condition:", error);
    res.status(500).json({ error: "Error updating marker condition" });
  }
});

router.get("/location-data", async (req, res) => {
  try {
    const locations = await UploadedImage.findAll({
      include: {
        model: User, // Include the User model
        attributes: ["name", "email"], // Select the 'name' attribute from User
      },
    });

    // Format the response data to send to the client
    const formattedLocations = locations.map((location) => ({
      id: location.id,
      image: location.image,
      latitude: location.latitude,
      longitude: location.longitude,
      userName: location.user.name, // Access the User's name
      // userName: location.User.name, // Access the User's name
      userEmail: location.user.email, // Access the User's email
      condition: location.condition === "1" ? "OK" : "Not OK", // Return the condition in human-readable form
      message: location.message,
      createdAt: location.createdAt,
    }));

    res.json(formattedLocations);
  } catch (error) {
    console.error("Error fetching location data:", error);
    res.status(500).send("Error fetching location data.");
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find the uploaded image by ID
    const uploadedImage = await UploadedImage.findByPk(id, {
      include: {
        model: User,
        attributes: ["id", "name"], // Include User model with specific attributes
      },
    });

    if (!uploadedImage) {
      return res.status(404).json({ error: "Uploaded image not found" });
    }

    // Extract relevant user information
    const userData = {
      userId: uploadedImage.userId,
      userName: uploadedImage.User.name,
      userEmail: uploadedImage.User.email,
      // Add more user attributes as needed
    };

    res.status(200).json(userData);
  } catch (error) {
    console.error("Error fetching uploaded image data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/delete-marker/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find the marker to delete
    const markerToDelete = await UploadedImage.findByPk(id);
    if (!markerToDelete) {
      return res.status(404).json({ error: "Marker not found" });
    }

    // Perform deletion
    await markerToDelete.destroy();

    // Respond with success message
    res.json({ message: "Marker deleted successfully" });
  } catch (error) {
    console.error("Error deleting marker:", error);
    res.status(500).json({ error: "Error deleting marker" });
  }
});

module.exports = router;
