const leagues = require("./03-leagues.json");

exports.seed = function (knex) {
  return knex
  .raw("TRUNCATE TABLE leagues RESTART IDENTITY CASCADE")
  .then(function () {
    return knex("leagues").insert(leagues);
  });
};