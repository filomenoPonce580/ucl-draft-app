// thirdPartyService.js
const axios = require("axios");

async function fetchUclData() {
  try {
    const headers = {
        "X-RapidAPI-Key": "9b789937dcmshfda6ddfdd2bb09bp1fc5f2jsnf884ec57a6d3",
        "X-RapidAPI-Host": "footapi7.p.rapidapi.com",
      };
    const response = await axios.get("https://footapi7.p.rapidapi.com/api/tournament/7/season/52162/standings/total", { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  fetchUclData,
};