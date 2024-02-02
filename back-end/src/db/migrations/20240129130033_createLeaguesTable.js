exports.up = function (knex) {
  return knex.schema
    .createTable("leagues", (table) => {
      table.increments("leagueId").primary();
      table.string("name").notNullable();
      table.integer("seasonId").notNullable().unsigned();
      table.foreign("seasonId").references("seasons.id").onDelete('CASCADE'); // Added onDelete
      table.timestamps(true, true);
    })
    .createTable("users", (table) => {
      table.increments("userId").primary();
      table.string("name").notNullable();
      table.integer("team1").notNullable();
      table.integer("team2").notNullable();
      table.integer("team3").notNullable();
      table.integer("team4").notNullable();
      table.integer("leagueId").unsigned().notNullable();
      table.foreign("leagueId").references("leagues.leagueId").onDelete('CASCADE'); // Added onDelete
      table.timestamps(true, true);
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users").dropTable("leagues");
};