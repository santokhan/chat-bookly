const whatsappService = require('./whatsapp.service.js');

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

    console.log('Hello there', JSON.stringify(reqData.statuses));
    if (reqData?.statuses) {
      res.send('ok');
      return;
    }

    res.send('ok');
    console.log('Request Data: ', req.body);

    const wp_user_name = reqData?.contacts?.[0]?.profile?.name;
    const user_phone_no = reqData?.contacts?.[0]?.wa_id;
    console.log({ reqData, wp_user_name, user_phone_no });
  }
};

module.exports = {
  webhookHandler,
};
