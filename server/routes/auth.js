const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const router = express.Router();
const User = require("../model/user");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const { name, email, user_password } = req.body;

  if (!name || !email || !user_password) {
    return res
      .status(400)
      .json({ message: "Name, email, and password are required" });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(user_password, 10);

    // Create a new user in the database
    const newUser = await User.create({
      name,
      email,
      user_password: hashedPassword,
    });

    // Generate JWT token for the newly registered user
    const token = jwt.sign(
      {
        id: newUser.id,
        name: newUser.name,
        profile_image: newUser.profile_image, // Add profile_image if available
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h", // Token expiry time
      }
    );

    return res.status(200).json({
      token,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, user_password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(
      user_password,
      user.user_password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        profile_image: user.profile_image,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({ token, message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Assuming you have configured Passport Google Strategy
// passport.use(new GoogleStrategy(...));

// Route for handling Google authentication redirect
router.get(
  "/google/redirect",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Assuming you have access to user information in req.user
    const { id, name, email } = req.user;

    // Generate JWT token
    const token = jwt.sign(
      { id, name, email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Token expiry time
    );

    // Redirect with token in query parameter
    res.redirect(`http://localhost:3000/pages/home?token=${token}`);
  }
);

module.exports = router;
