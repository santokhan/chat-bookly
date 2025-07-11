const conversationService = require('./conversation.service.js');

const createConversation = async (req, res) => {
  try {
    const conversation = await conversationService.createConversation(req.body);
    res.status(201).json(conversation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateConversation = async (req, res) => {
  try {
    const { status, conversationId } = req.body;
    const conversation = await conversationService.updateConversation(status, conversationId);
    res.status(200).json(conversation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createConversation,
  updateConversation,
};
