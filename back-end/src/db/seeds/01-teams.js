const teams = require("./01-teams.json");

exports.seed = function (knex) {
  return knex
    .raw("TRUNCATE TABLE teams RESTART IDENTITY CASCADE")
    .then(function () {
      return knex("teams").insert(teams);
    });
};