const express = require("express");
const cors = require("cors");
const config = require("./config/config");
const os = require("os");
const { exec } = require("child_process");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
const mongoose = require("mongoose");

const url = config.mongodb_uri;
const connect = mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
connect.then(
  (db) => {
    console.log("Connected correctly to server");
  },
  (err) => {
    console.log(err);
  }
);

// Define your routes here
const policyRoutes = require("./routes/policy");
app.use("/api/insuredMine", policyRoutes);

const messageRoutes = require("./routes/message");
app.use("/api/insuredMine", messageRoutes);

// Function to restart the server
const restartServer = () => {
  console.log("Restarting server due to high CPU usage...");
  exec("pm2 restart index", (error, stdout, stderr) => {
    if (error) {
      console.error(`Error restarting server: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`Server restarted successfully.`);
  });
};

// Check CPU usage periodically
const checkCpuUsage = () => {
  const cpuUsage = os.loadavg()[0] * 100; // Get the average CPU usage for the last minute

  console.log(`Current CPU usage: ${cpuUsage.toFixed(2)}%`);

  if (cpuUsage >= 70) {
    restartServer();
  }
};

// Set up periodic CPU usage check
const interval = setInterval(checkCpuUsage, 5000); // Check every 5 seconds

// Listen for incoming requests
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
