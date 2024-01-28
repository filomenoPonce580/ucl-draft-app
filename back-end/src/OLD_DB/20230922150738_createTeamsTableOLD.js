exports.up = function (knex) {
    return knex.schema.createTable("teams", (table) => {
      table.increments("teamId").primary();
      table.string("teamName");
      table.string("abbreviation");
      table.string("country");
      table.specificType("results", "text[]");;
      table.integer("goalsFor");
      table.integer("goalsAgainst");
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("teams");
  };