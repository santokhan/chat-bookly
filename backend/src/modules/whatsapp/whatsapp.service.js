const axios = require('axios');
const whatsappHelper = require('./whatsapp.helper.js');
const conversationService = require('../conversation/conversation.service.js');
const {
  WHATSAPP_CLOUD_API,
  WHATSAPP_PHONE_ID,
  WHATSAPP_BUSINESS_ID,
  WHATSAPP_TOKEN,
  WHATSAPP_PHONE_NUMBER,
} = require('./whatsapp.constants.js');

const url = `${WHATSAPP_CLOUD_API}/${WHATSAPP_PHONE_ID}/messages`;
const header = {
  headers: {
    Authorization: `Bearer ${WHATSAPP_TOKEN}`,
    'Content-Type': 'application/json',
  },
};

const whatsappService = {
  sendAudio: async (data) => {
    try {
      const objectData = whatsappHelper.messageType('audio', data);
      if (objectData.message == 'error') {
        return objectData;
      }
      const response = await axios.post(url, objectData, header);
      return { message: 'done', response };
    } catch (error) {
      return { message: 'error', error };
    }
  },
  sendButton: async (data) => {
    try {
      const objectData = whatsappHelper.messageType('button', data);
      if (objectData.message == 'error') {
        return objectData;
      }
      const response = await axios.post(url, objectData, header);
      return { message: 'done', response };
    } catch (error) {
      return { message: 'error', error };
    }
  },
  createTemplate: async (mediaId, data) => {
    const urlTemplate = `${WHATSAPP_CLOUD_API}/${WHATSAPP_BUSINESS_ID}/message_templates`;
    const { name, language, category, header, body, footer, buttons } = data;
    let requestData = { name, language, category };
    if (header && header.format === 'TEXT') {
      if (header.text) {
        let headerComponent = {
          type: 'HEADER',
          format: header.format,
          text: header.text,
        };
        if (header.example) {
          headerComponent.example = { header_text: [header.example] };
        }
        requestData.components = [headerComponent];
      }
    }
    if (['IMAGE', 'VIDEO', 'DOCUMENT'].includes(header?.format)) {
      requestData.components = requestData.components || [];
      requestData.components.push({
        type: 'HEADER',
        format: header.format,
        example: { header_handle: [mediaId] },
      });
    }
    if (body?.text) {
      let bodyComponent = { type: 'BODY', text: body.text };
      if (body.example) {
        bodyComponent.example = { body_text: [body.example] };
      }
      requestData.components = requestData.components || [];
      requestData.components.push(bodyComponent);
    }
    if (footer?.text) {
      requestData.components = requestData.components || [];
      requestData.components.push({ type: 'FOOTER', text: footer.text });
    }
    if (buttons) {
      requestData.components = requestData.components || [];
      let buttonComponent = { type: 'BUTTONS', buttons: [] };
      buttons.forEach(button => {
        if (button.type === 'QUICK_REPLY') {
          buttonComponent.buttons.push({ type: button.type, text: button.text });
        } else if (button.type === 'URL') {
          buttonComponent.buttons.push({ type: button.type, text: button.text, url: button.url });
        } else if (button.type === 'PHONE_NUMBER') {
          buttonComponent.buttons.push({ type: button.type, text: button.text, phone_number: button.country + button.phone_number });
        } else if (button.type === 'COPY_CODE') {
          buttonComponent.buttons.push({ type: button.type, example: button.example });
        }
      });
      buttonComponent.buttons = [...buttonComponent.buttons];
      requestData.components.push(buttonComponent);
    }
    try {
      const response = await axios.post(urlTemplate, requestData, header);
      const responseData = response.data;
      return { message: 'done', response };
    } catch (error) {
      return { message: 'error', error: error?.response?.data || error?.message };
    }
  },
  sendDocument: async (data) => {
    try {
      const objectData = whatsappHelper.messageType('document', data);
      if (objectData.message == 'error') {
        return objectData;
      }
      const response = await axios.post(url, objectData, header);
      return { message: 'done', response };
    } catch (error) {
      return { message: 'error', error };
    }
  },
  getTemplates: async () => {
    try {
      const templates = await axios.get(
        `${WHATSAPP_CLOUD_API}/${WHATSAPP_BUSINESS_ID}/message_templates`,
        { headers: { Authorization: `Bearer ${WHATSAPP_TOKEN}` } }
      );
      return { message: 'done', templates };
    } catch (error) {
      return { message: 'error', error };
    }
  },
  getTemplatefromTemplateName: async (templateName) => {
    try {
      let urlTemplate = `${WHATSAPP_CLOUD_API}/${WHATSAPP_BUSINESS_ID}/message_templates`;
      let template = [];
      while (!template || !template.length) {
        const templates = await axios.get(urlTemplate, { headers: { Authorization: `Bearer ${WHATSAPP_TOKEN}` } });
        template = templates.data.data.filter((template) => template.name === templateName.toLowerCase());
        if (template.length > 0) {
          break;
        } else {
          urlTemplate = templates.data.paging.next;
        }
      }
      return { message: 'done', template: template[0] };
    } catch (error) {
      return { message: 'error', error };
    }
  },
  sendImage: async (data) => {
    try {
      const objectData = whatsappHelper.messageType('image', data);
      if (objectData.message == 'error') {
        return objectData;
      }
      const response = await axios.post(url, objectData, header);
      return { message: 'done', response };
    } catch (error) {
      return { message: 'error', error };
    }
  },
  sendList: async (data) => {
    try {
      const objectData = whatsappHelper.messageType('list', data);
      if (objectData.message == 'error') {
        return objectData;
      }
      const response = await axios.post(url, objectData, header);
      return { response, message: 'done' };
    } catch (error) {
      return { error, message: 'error' };
    }
  },
  sendLocation: async (data) => {
    try {
      const objectData = whatsappHelper.messageType('location', data);
      if (objectData.message == 'error') {
        return objectData;
      }
      const response = await axios.post(url, objectData, header);
      return { message: 'done', response };
    } catch (error) {
      return { message: 'error', error };
    }
  },
  sendText: async (message, phone) => {
    try {
      const objectData = whatsappHelper.messageType('text', { message, phone });
      if (objectData.message == 'error') {
        return objectData;
      }
      const response = await axios.post(url, objectData, header);
      return { message: 'done', response };
    } catch (error) {
      return { message: 'error', error };
    }
  },
  sendTemplate: async (templateName, phone, language, header, params, buttons) => {
    try {
      const templates = await axios.get(
        `${WHATSAPP_CLOUD_API}/${WHATSAPP_BUSINESS_ID}/message_templates?limit=100`,
        { headers: { Authorization: `Bearer ${WHATSAPP_TOKEN}` } }
      );
      const template = templates.data.data.filter(
        (item) => {
          if (item.name === templateName && item.language === language) {
            return item;
          }
        }
      );
      if (!template) {
        return { message: 'error', error: 'Template not found' };
      }
      let components = [];
      if (header && header !== undefined && header !== null) {
        if (header.type === 'text') {
          components.push({
            type: 'header',
            parameters: [ { type: 'text', text: header.data } ]
          });
        } else if (header.type === 'image') {
          components.push({
            type: 'header',
            parameters: [ { type: 'image', image: { link: header.data } } ]
          });
        } else if (header.type === 'video') {
          components.push({
            type: 'header',
            parameters: [ { type: 'video', video: { link: header.data } } ]
          });
        } else if (header.type === 'document') {
          components.push({
            type: 'header',
            parameters: [ { type: 'document', document: { link: header.data } } ]
          });
        }
      }
      let parameters = [];
      if (params && params !== undefined && params !== null) {
        params.forEach((param) => {
          const a = { type: 'text', text: param };
          parameters.push(a);
        });
        if (parameters.length > 0) {
          components.push({ type: 'body', parameters });
        }
      }
      let index = 0;
      if (buttons && buttons !== undefined && buttons !== null) {
        buttons.forEach((button) => {
          components.push({
            type: 'button',
            sub_type: 'url',
            index: index,
            parameters: [ { type: 'text', text: button } ],
          });
          index++;
        });
      }
      // Header
      const headerComponent = template[0].components.find(comp => comp.type === "HEADER");
      if (headerComponent) {
        headerComponent.data = header.data;
      }
      // Body
      const bodyComponent = template[0].components.find(comp => comp.type === "BODY");
      if (!bodyComponent) {
        return { message: 'error', error: 'Body component not found' };
      }
      if (params === undefined || params === null) {
        return { message: 'error', error: 'Params are required' };
      }
      const placeholderMatches = bodyComponent.text.match(/{{\d+}}/g) || [];
      const numPlaceholders = placeholderMatches.length;
      if (numPlaceholders !== params.length) {
        return { message: 'error', error: `Required ${numPlaceholders} params` };
      }
      let populatedBodyText = bodyComponent.text;
      placeholderMatches.forEach((placeholder, index) => {
        populatedBodyText = populatedBodyText.replace(placeholder, params[index]);
      });
      bodyComponent.text = populatedBodyText;
      // Buttons
      const buttonComponent = template[0].components.find(comp => comp.type === "BUTTONS");
      if (buttonComponent) {
        const btns = buttonComponent.buttons;
        if (buttons === undefined || buttons === null) {
          return { message: 'error', error: 'Buttons are required.' };
        }
        const numberofButtons = buttons.length;
        if (numberofButtons === btns.length) {
          btns.forEach((button, index) => {
            const newUrl = button.url.replace(`{{${index+1}}}`, buttons[index]);
            button.url = newUrl;
          });
        } else {
          return { message: 'error', error: `Number of buttons required (${btns.length}) does not match the number of buttons provided (${numberofButtons}).` };
        }
      } else {
        return { message: 'error', error: 'Button component not found.' };
      }
      // Footer
      const footerComponent = template[0].components.find(comp => comp.type === "FOOTER");
      const component = {
        header: headerComponent ? headerComponent : {},
        body: bodyComponent ? bodyComponent : {},
        buttons: buttonComponent ? buttonComponent : {},
        footer: footerComponent ? footerComponent : {},
      };
      const response = await axios.post(
        `${WHATSAPP_CLOUD_API}/${WHATSAPP_PHONE_ID}/messages`,
        {
          messaging_product: 'whatsapp',
          to: phone,
          type: 'template',
          template: {
            name: templateName,
            language: { code: language },
            components: components,
          },
        },
        header
      );
      return { message: 'done', response };
    } catch (error) {
      return { message: 'error', error: error.response?.data?.error || error.message };
    }
  },
  sendVideo: async (data) => {
    try {
      const objectData = whatsappHelper.messageType('video', data);
      if (objectData.message == 'error') {
        return objectData;
      }
      const response = await axios.post(url, objectData, header);
      return { message: 'done', response };
    } catch (error) {
      return { message: 'error', error };
    }
  },
  webhook: async (data) => {
    const reqData = data.entry[0]?.changes[0]?.value;
    if (reqData.statuses) {
      const status = reqData.statuses[0];
      const conversationId = status.id;
      // Conversation update logic should be handled in the conversation module
      return 'ok';
    }
    return;
  },
};

module.exports = whatsappService;
