exports.up = function (knex) {
    return knex.schema.createTable("teams", (table) => {
      table.increments("teamId").primary();
      table.string("teamName");
      table.string("abbreviation");
      table.string("country");
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("teams");
  };