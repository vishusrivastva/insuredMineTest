const messageService = require('../services/message');

exports.scheduleMessage = async (req, res) => {
    try {
        const payload = {
            message : req.body.message,
            day : req.body.day,
            time : req.body.time
        }
      const response = await messageService.scheduleMessage(payload);
      res.json({success: true, message : `Successfullly scheduled message at ${response}`});
    } catch (error) {
      res.status(500).json({ success : false, message: `Internal Server Error: ${error.message}` });
    }
  };