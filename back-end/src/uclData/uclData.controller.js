// thirdPartyController.js
const service = require("./uclData.services");

async function getUclData(req, res, next) {
  try {
    const data = await service.fetchUclData();
    res.json(data);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getUclData,
};