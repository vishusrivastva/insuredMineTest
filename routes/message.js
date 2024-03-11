const express = require("express");
const router = express.Router();
const messageController = require("../controllers/message");

router.post("/scheduleMessage", messageController.scheduleMessage);

module.exports = router;
