const policyService = require("../services/policy");

exports.uploadFile = async (req, res) => {
  try {
    const upload = await policyService.uploadFile(req);
    res.json({
      success: true,
      data: upload,
      message: "successfullly uploaded data",
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: `Internal Server Error: ${error.message}`,
      });
  }
};

//find policy info with the help of the username
exports.searchPolicyInfo = async (req, res) => {
  try {
    const { userName } = req.body;
    const filter = { firstName: userName };
    const policyInfo = await policyService.searchPolicyInfo(filter);
    res.json({
      success: true,
      data: policyInfo,
      message: "successfullly fetched data",
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: `Internal Server Error: ${error.message}`,
      });
  }
};

exports.aggregatePolicy = async (req, res) => {
  try {
    const policyInfo = await policyService.aggregatePolicy();
    res.json({
      success: true,
      data: policyInfo,
      message: "successfullly fetched data",
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: `Internal Server Error: ${error.message}`,
      });
  }
};
