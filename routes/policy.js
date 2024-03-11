const express = require("express");
const router = express.Router();
const policyController = require("../controllers/policy");
const multer = require("multer");


// Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads"); // Set your upload directory
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
