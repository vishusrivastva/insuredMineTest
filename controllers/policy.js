// Import any required services or models here
const policyService = require('../services/policy');

// Define your controller methods
exports.getExamples = async (req, res) => {
  try {
    const examples = await policyService.getExamples();
    res.json(examples);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.createExample = async (req, res) => {
  try {
    const { name } = req.body;
    const newExample = await policyService.createExample(name);
    res.json(newExample);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};