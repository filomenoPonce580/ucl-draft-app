// thirdPartyController.js
const service = require("./uclData.services");

async function fetchUCLData(req, res, next) {
  try {
    const data = await service.fetchUCLData();
    res.json(data);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  fetchUCLData,
};