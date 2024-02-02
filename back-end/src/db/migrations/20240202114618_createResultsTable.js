exports.up = function (knex) {
    return knex.schema.createTable("results", (table) => {
      table.increments("id").primary();
      table.integer("seasonId").unsigned().references("seasons.id");
      table.integer("teamId").unsigned().references("teams.teamId");
      table.specificType("matchResults", "text[]");
      table.integer("goalsFor");
      table.integer("goalsAgainst");
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("results");
  };