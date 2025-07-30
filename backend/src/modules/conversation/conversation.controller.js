import Conversation from './conversation.model.js';

export const createConversation = async (req, res) => {
  try {
    const { to, from, message, conversation_id, bound, business_id } = req.body;

    if (!to || !from || !message || !conversation_id || !bound || !business_id) {
      return res.status(400).json({ 
        error: 'Missing required fields: to, from, message, conversationId, bound, business_id' 
      });
    }

    if (!['inbound', 'outbound'].includes(bound)) {
      return res.status(400).json({ 
        error: 'bound must be either "inbound" or "outbound"' 
      });
    }

    const conversation = new Conversation({
      to,
      from,
      message,
      conversation_id,
      bound,
      business_id,
    });

    const savedConversation = await conversation.save();
    res.status(201).json({
      success: true,
      message: 'Conversation created successfully',
      conversation: savedConversation,
    });
  } catch (error) {
    console.error('Error creating conversation:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create conversation',
      error: error.message,
    });
  }
};

export const getConversationsByBusinessAndUser = async (req, res) => {
  try {
    const { business_id, user_id } = req.query;
    
    if (!business_id || !user_id) {
      return res.status(400).json({ 
        error: 'Missing required query parameters: business_id and user_id' 
      });
    }

    // Find conversations where the user is either the sender (from) or receiver (to)
    // and the business_id matches
    const conversations = await Conversation.find({
      business_id,
      $or: [
        { from: user_id },
        { to: user_id },
      ]
    })
    .populate('to', 'name email') // Populate user details
    .populate('from', 'name email') // Populate user details
    .populate('business_id', 'name') // Populate business details
    .sort({ createdAt: -1 }); // Sort by newest first

    res.status(200).json({
      success: true,
      message: 'Conversations fetched successfully',
      conversations,
    });
  } catch (error) {
    console.error('Error fetching conversations:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch conversations',
      error: error.message,
    });
  }
};

export const getConversationsByBusiness = async (req, res) => {
  try {
    const { business_id } = req.params;
    
    if (!business_id) {
      return res.status(400).json({ 
        error: 'Missing required parameter: business_id' 
      });
    }

    const conversations = await Conversation.find({ business_id })
      .populate('to', 'name email')
      .populate('from', 'name email')
      .populate('business_id', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json(conversations);
  } catch (error) {
    console.error('Error fetching conversations by business:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getConversationsByUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    
    if (!user_id) {
      return res.status(400).json({ 
        error: 'Missing required parameter: user_id' 
      });
    }

    const conversations = await Conversation.find({
      $or: [
        { from: user_id },
        { to: user_id }
      ]
    })
    .populate('to', 'name email')
    .populate('from', 'name email')
    .populate('business_id', 'name')
    .sort({ createdAt: -1 });

    res.status(200).json(conversations);
  } catch (error) {
    console.error('Error fetching conversations by user:', error);
    res.status(500).json({ error: error.message });
  }
};
