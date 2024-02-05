const knex = require("../db/connection");

// returns data of all leagues
function list() {
  return knex("leagues")
    .select("*");
}

module.exports = {
    // read,
    list,
    // create,
    // update,
};