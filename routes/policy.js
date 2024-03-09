const express = require('express');
const router = express.Router();
const policyController = require('../controllers/policy');

// Define your routes
router.get('/', policyController.getExamples);
router.post('/', policyController.createExample);
// Add more routes as needed

module.exports = router;