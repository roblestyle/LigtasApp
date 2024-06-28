// routes/profile.js
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  if (!req.user) {
    return res.redirect("/auth/google");
  }
  res.send(`
    <h1>Profile</h1>
    <p>Name: ${req.user.name}</p>
    <p>Email: ${req.user.email}</p>
    <a href="/auth/logout">Logout</a>
  `);
});

module.exports = router;
