import * as businessService from './business.service.js';

export async function setData(req, res) {
  try {
    const business = await businessService.setBusinessData(req.body);
    res.status(200).json(business);
  } catch (err) {
    res.status(400).json(err);
  }
}
