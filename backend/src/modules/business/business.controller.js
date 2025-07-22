import * as businessService from './business.service.js';

export async function setData(req, res) {
  try {
    const business = await businessService.setBusinessData(req.body);
    res.status(200).json(business);
  } catch (err) {
    res.status(400).json(err);
  }
}

export async function getData(req, res) {
  try {
    const business_id = req.query.business_id || null;
    const result = await businessService.getBusinessData(business_id);
    res.status(result.success ? 200 : 404).json(result);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}
