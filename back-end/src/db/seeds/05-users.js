const users = require("./05-users.json");

exports.seed = function (knex) {
  return knex
    .raw("TRUNCATE TABLE users RESTART IDENTITY CASCADE")
    .then(function () {
      return knex("users").insert(users);
    });
};