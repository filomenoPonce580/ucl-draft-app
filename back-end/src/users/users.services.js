const knex = require("../db/connection");

//returns the reservation that matched the given reservation id
function read(userId) {
  return knex("users").select("*").where({ userId: userId }).first();
}

// returns all habits with the given date with all fields
function list() {
  return knex("users").select("*");
}

// return the pushed new reservation to the database and updates the created records
function create(user) {
  return knex("users")
    .insert(user)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}


//returns the updated user
function update(user) {
  return knex("users")
    .select("*")
    .where({ userId: user.userId })
    .update(user, "*")
    .then((updatedRecords) => updatedRecords[0]);
}

module.exports = {
  read,
  list,
  create,
  update,
};
