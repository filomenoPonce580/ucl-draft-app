const leagues = require("./03-leagues.json");

exports.seed = function (knex) {
  return knex
    .raw("TRUNCATE TABLE users, leagues RESTART IDENTITY CASCADE")
    .then(function () {
      // Insert leagues
      return knex("leagues").insert(
        leagues.map((league) => {
          const { users, ...leagueData } = league;
          return leagueData;
        })
      );
    })
    .then(function () {
      // Insert users
      const usersData = leagues.flatMap((league) => {
        return league.users.map((user) => {
          return {
            leagueId: league.leagueId,
            ...user,
          };
        });
      });
      return knex("users").insert(usersData);
    });
};