// app.js
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const passport = require("./config/passport");
const authRoutes = require("./routes/auth");
const path = require("path");
const uploadRouter = require("./routes/upload");
const apiRoutes = require("./routes/api");
const sequelize = require("./config/database");
const adminAuthRoutes = require("./routes/adminauth");
const helpRouter = require("./routes/help");
const notificationRouter = require("./routes/notification");

const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express.json());

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // List of allowed origins
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3002',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:3002',
      // Add your production domain here when deployed
      'https://steerhub.batstateu.edu.ph/safespartan',
    ];
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true, // Allow cookies to be sent with requests
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));
app.use("/api", apiRoutes);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use("/api", uploadRouter);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/admin", adminAuthRoutes);
app.use("/api/send-help", helpRouter);
app.use("/api/notifications", notificationRouter);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    await sequelize.sync({ force: false });
    console.log("Database synchronized.");

    app.listen(5000, () => {
      console.log(`Server is running on port 5000.`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

startServer();
