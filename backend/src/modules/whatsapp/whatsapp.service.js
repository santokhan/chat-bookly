import axios from 'axios';
import whatsappHelper from './whatsapp.helper.js';
import whatsappFlowModel from './whatsappFlow.model.js';

const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const WHATSAPP_PHONE_ID = process.env.WHATSAPP_PHONE_ID;
const WHATSAPP_CLOUD_API = process.env.WHATSAPP_CLOUD_API;
const WHATSAPP_BUSINESS_ID = process.env.WHATSAPP_BUSINESS_ID;

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
      const headerComponent = template[0].components.find(comp => comp.type === 'HEADER');
      if (headerComponent) {
        headerComponent.data = header.data;
      }
      // Body
      const bodyComponent = template[0].components.find(comp => comp.type === 'BODY');
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
      const buttonComponent = template[0].components.find(comp => comp.type === 'BUTTONS');
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
      const footerComponent = template[0].components.find(comp => comp.type === 'FOOTER');
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
  getAccessToken: async (appId, appSecret, code = null) => {
    try {
      // Step 1: Get temp token
      const temporaryAccessToken = await getTemporaryAccessToken(appId, appSecret);
      console.log('temporaryAccessToken: ', temporaryAccessToken);

      const permanentAccessToken = await getPermanentAccessToken(
        appId,
        appSecret,
        temporaryAccessToken.access_token,
        code,
      );

      console.log('permanentAccessToken: ', permanentAccessToken);
      return {
        success: true,
        access_token: 'accessTokenRes.data.access_token',
      };
    } catch (error) {
      console.log('error: ', error?.response?.data);
      return {
        success: false,
        error: error.response?.data || error.message,
      };
    }
  },
  registerPhoneNumber: async (accessToken, phoneNumberId, pin = '123456') => {
    try {
      const url = `${WHATSAPP_CLOUD_API}/${phoneNumberId}/register`;
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      };
      const requestData = {
        messaging_product: 'whatsapp',
        pin,
      };
      const res = await axios.post(url, requestData, { headers });
      return {
        success: true,
        data: res.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || error.message,
      };
    }
  },
  subscribeApp: async (accessToken, wabaId, callbackUri, verifyToken) => {
    try {
      const url = `${WHATSAPP_CLOUD_API}/${wabaId}/subscribed_apps`;
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      };
      const requestData = {
        override_callback_uri: callbackUri,
        verify_token: verifyToken,
      };
      const res = await axios.post(url, requestData, { headers });
      return {
        success: true,
        data: res.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || error.message,
      };
    }
  },
  getBusinessProfile: async (accessToken, phoneNumberId) => {
    try {
      const url = `${WHATSAPP_CLOUD_API}/${phoneNumberId}/whatsapp_business_profile`;
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const res = await axios.get(url, { headers });
      return {
        success: true,
        data: res.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || error.message,
      };
    }
  },
  getPhoneNumberStatus: async (accessToken, phoneNumberId) => {
    try {
      const url = `${WHATSAPP_CLOUD_API}/${phoneNumberId}`;
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const res = await axios.get(url, { headers });
      return {
        success: true,
        data: res.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || error.message,
      };
    }
  },
  getAccountReviewStatus: async (accessToken, wabaId) => {
    try {
      const url = `${WHATSAPP_CLOUD_API}/${wabaId}`;
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const res = await axios.get(url, { headers });
      return {
        success: true,
        data: res.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || error.message,
      };
    }
  },
  sendWhatsappFlow: async (
    phone,
    flow_header,
    flow_body,
    flow_footer,
    flow_id,
    // screen_name,
  ) => {
    const url = `${WHATSAPP_CLOUD_API}/${WHATSAPP_PHONE_ID}/messages`;

    let data = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: phone,
      type: 'interactive',
      interactive: {
        type: 'flow',
        header: {
          type: 'text',
          text: flow_header,
        },
        body: {
          text: flow_body,
        },
        footer: {
          text: flow_footer,
        },
        action: {
          name: 'flow',
          parameters: {
            flow_message_version: '3',
            flow_token: 'AQAAAAACS5FpgQ_cAAAAAD0QI3s.',
            flow_id: flow_id,
            flow_cta: 'Sign Up',
            // flow_action: 'navigate',
            // flow_action_payload: {
            //   screen: screen_name,
            // },
          },
        },
      },
    };
  
    try {
      const response = await axios.post(
        url,
        data,
        {
          headers: {
            Authorization: `Bearer ${WHATSAPP_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return {
        response,
        message: 'done',
      };
    } catch (error) {
      return error?.response?.data;
    }
  },
  getFlowIdForBusiness: async (business_id) => {
    const flow = await whatsappFlowModel.findOne({ business_id });
    return flow;
  }
};

  const getTemporaryAccessToken = async (appId, appSecret) => {
    try {
      const response = await axios.get(
        `https://graph.facebook.com/oauth/access_token?client_id=${appId}&client_secret=${appSecret}&grant_type=client_credentials`
      );

      return response.data;
    } catch (error) {
      console.error('Error: ', error?.response?.data?.error);
    }
  }

  const getPermanentAccessToken = async (appId, appSecret, temporaryAccessToken, token) => {
    try {
      console.log('temporaryAccessToken: ', temporaryAccessToken, token);

      const url = 'https://graph.facebook.com/v20.0/oauth/access_token';
      const response = await axios.post(
        url,
        {
          client_id: appId,
          client_secret: appSecret,
          code: token,
        },
        {
          headers: {
            Authorization: `Bearer ${temporaryAccessToken}`,
            'Content-Type': 'application/json',
          },
        },
      )

      console.log('response: ', response);
      return response.data;
    } catch (error) {
      console.error('Error in generating permanent access token: ', error?.response?.data?.error);
    }
  }

  const webhookRegistration = async (accessToken, identifier, wabaId) => {
    try {
      const url = `https://graph.facebook.com/v20.0/${wabaId}/subscribed_apps`;
      const response = await axios.post(
        url,
        {
          override_callback_uri: `https://${identifier}-api.firmli.com/v1/whatsapp-webhook/receive`,
          verify_token: identifier.toUpperCase(),
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      return response.data;
    } catch (error) {
      console.error('Error: ', error?.response?.data?.error);
    }
  }

  const createSignupFlow = async (accessToken, wabaId, business_id) => {
    try {
      const url = `https://graph.facebook.com/v20.0/${wabaId}/message_flows`;
      const response = await axios.post(
        url,
        {
          name: "Sign Up Form",
          categories: [ "SIGN_UP" ],
          flow_json: "{\"version\":\"7.2\",\"screens\":[{\"id\":\"SIGNUPFORM\",\"title\":\"SignupForm\",\"data\":{},\"terminal\":true,\"success\":true,\"layout\":{\"type\":\"SingleColumnLayout\",\"children\":[{\"type\":\"Form\",\"name\":\"form\",\"children\":[{\"type\":\"TextInput\",\"name\":\"Name\",\"label\":\"Name\",\"input-type\":\"text\",\"required\":true},{\"type\":\"TextInput\",\"label\":\"Email\",\"name\":\"Email\",\"input-type\":\"email\",\"required\":true},{\"type\":\"TextInput\",\"label\":\"Password\",\"name\":\"Password\",\"input-type\":\"password\",\"min-chars\":6,\"required\":true},{\"type\":\"OptIn\",\"label\":\"Iagreetotheterms&conditions.\",\"required\":true,\"name\":\"tos_optin\"},{\"type\":\"Footer\",\"label\":\"Done\",\"on-click-action\":{\"name\":\"complete\",\"payload\":{\"name\":\"${form.Name}\",\"email\":\"${form.Email}\",\"password\":\"${form.Password}\",\"optin\":\"${form.tos_optin}\"}}}]}]}}]}",
          publish: true,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      const flow = new whatsappFlowModel({
        flow_id: response.data.id,
        business_id: business_id,
      });
      flow.save();

      return flow;
    } catch (error) {
      console.error('Error: ', error?.response?.data?.error);
    }
  }

export default whatsappService;
