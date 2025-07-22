import Conversation from './conversation.model.js';

const conversationService = {
  createConversation: async (data) => {
    const conversation = new Conversation(data);
    return await conversation.save();
  },

  updateConversation: async (status, conversationId) => {
    return await Conversation.findOneAndUpdate(
      { conversationId },
      { $set: { status } },
      { new: true }
    );
  },
};

export default conversationService;
