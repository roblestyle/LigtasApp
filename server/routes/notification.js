// routes/notifications.js

const express = require("express");
const router = express.Router();
const Notification = require("../model/notification");
const User = require("../model/user"); // Adjust as per your setup

// GET notifications for a specific user
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    // Ensure the user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch notifications for the user
    const notifications = await Notification.findAll({
      where: { userId },
      include: [
        { model: User, as: "user", attributes: ["id", "name"] },
        // Include other associations as needed
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json({ notifications });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Failed to fetch notifications" });
  }
});

module.exports = router;
