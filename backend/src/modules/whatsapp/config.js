export const WHATSAPP_CONFIG = {
  // Default language for messages (can be 'en' or 'it')
  DEFAULT_LANGUAGE: 'it',

  // Message types
  MESSAGE_TYPES: {
    TEXT: 'text',
    INTERACTIVE: 'interactive',
    BUTTON_REPLY: 'button_reply',
    LIST_REPLY: 'list_reply',
    NFM_REPLY: 'nfm_reply'
  },

  // Interactive types
  INTERACTIVE_TYPES: {
    BUTTON_REPLY: 'button_reply',
    LIST_REPLY: 'list_reply',
    NFM_REPLY: 'nfm_reply'
  },

  // Appointment statuses
  APPOINTMENT_STATUS: {
    SCHEDULED: 'scheduled',
    CANCELLED: 'cancelled'
  },
};

export default WHATSAPP_CONFIG;
