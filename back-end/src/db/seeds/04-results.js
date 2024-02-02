const results = require("./04-results.json");

exports.seed = function (knex) {
  return knex
    .raw("TRUNCATE TABLE results RESTART IDENTITY CASCADE")
    .then(function () {
      return knex("results").insert(results);
    });
};