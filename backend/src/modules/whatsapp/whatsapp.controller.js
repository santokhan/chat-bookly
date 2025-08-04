import whatsappService from './whatsapp.service.js';

const webhookHandler = (req, res) => {
  if (
    req.method === 'GET' &&
    req.query['hub.mode'] === 'subscribe' &&
    req.query['hub.verify_token'] === 'uk9fHCXt7WFRcD3t'
  ) {
    return res.send(req.query['hub.challenge']);
  }

  if (req.method === 'POST') {
    const data = req.body;
    const reqData = data.entry?.[0]?.changes?.[0]?.value;

    if (reqData?.statuses) {
      res.send('ok');
      return;
    }

    res.send('ok');

    const wp_user_name = reqData?.contacts?.[0]?.profile?.name;
    const user_phone_no = reqData?.contacts?.[0]?.wa_id;
    console.log({ reqData, wp_user_name, user_phone_no });
  }
};

const getCompleteBusinessData = async (req, res) => {
  try {
    const {
      code,
      wabaId,
      accessToken,
      callbackUri,
      verifyToken,
      phoneNumberId,
      pin = '123456',
      subscribeToWebhook = false,
    } = req.body;

    const appId = process.env.APP_ID;
    const appSecret = process.env.APP_SECRET;

    let token = accessToken;
    if (!token && appId && appSecret) {
      const tokenRes = await whatsappService.getAccessToken(appId, appSecret, code, process.env.REDIRECT_URI);
      if (!tokenRes.success) {
        return res.status(400).json(tokenRes);
      }

      token = tokenRes.access_token;
    }

    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Access token required',
      });
    }

    let webhookRes = null;
    let phoneRegRes = null;
    if (subscribeToWebhook && phoneNumberId && wabaId && callbackUri && verifyToken) {
      phoneRegRes = await whatsappService.registerPhoneNumber(token, phoneNumberId, pin);
      webhookRes = await whatsappService.subscribeApp(token, wabaId, callbackUri, verifyToken);
    }

    // Get phone number status
    const phoneStatusRes = await whatsappService.getPhoneNumberStatus(token, phoneNumberId);

    // Get account review status
    const accountReviewRes = await whatsappService.getAccountReviewStatus(token, wabaId);

    // Get business profile
    const businessProfileRes = await whatsappService.getBusinessProfile(token, phoneNumberId);

    return res.json({
      success: true,
      accessToken: token,
      phoneRegistration: phoneRegRes,
      webhookRegistration: webhookRes,
      phoneNumberStatus: phoneStatusRes,
      accountReviewStatus: accountReviewRes,
      businessProfile: businessProfileRes,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export default {
  webhookHandler,
  getCompleteBusinessData,
};
