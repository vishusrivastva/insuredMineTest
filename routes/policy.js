const express = require("express");
const router = express.Router();
const policyController = require("../controllers/policy");
const multer = require("multer");
const fs = require("fs");

// Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "uploads";
    // Check if the uploads directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({
  storage: storage,
}).single("media");

router.post("/upload", upload, policyController.uploadFile);
router.post("/searchPolicyInfo", policyController.searchPolicyInfo);
router.get("/aggregatePolicy", policyController.aggregatePolicy);

module.exports = router;
