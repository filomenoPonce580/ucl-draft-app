const seasons = require("./02-seasons.json");

exports.seed = function (knex) {
  return knex
    .raw("TRUNCATE TABLE seasons RESTART IDENTITY CASCADE")
    .then(function () {
      return knex("seasons").insert(seasons);
    });
};