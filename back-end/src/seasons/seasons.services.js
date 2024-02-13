const knex = require("../db/connection");

//returns the team that matched the given team id
function read(id) {
  return knex("seasons")
    .select("*")
    .where({ id: id })
    .first();
}

// returns data of all teams
function list() {
  return knex("seasons")
    .select("*");
}

// updates team with the given data for team with mathing team Id
// async function update(teamId, updatedTeamData) {
//   return knex("teams")
//     .where({ teamId: teamId })
//     .update(updatedTeamData)
//     .returning("*")
//     //.then((rows) => rows[0]);
// }

module.exports = {
    read,
    list,
    // create,
    // update,
};
  