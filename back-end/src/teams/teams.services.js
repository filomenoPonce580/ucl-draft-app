const knex = require("../db/connection");

//returns the user that matched the given user id
function read(teamId) {
  return knex("teams").select("*").where({ teamId: teamId }).first();
}

// returns all users with the given date with all fields
function list() {
  return knex("teams").select("*");
}


module.exports = {
    read,
    list,
    // create,
    // update,
};
  